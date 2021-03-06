import SwitchTemplate from './switch-template.html'
import FieldErrorTemplate from './field-error-template.html'

const fieldErrorTemplate = document.createElement('template')
fieldErrorTemplate.innerHTML = FieldErrorTemplate

const template = document.createElement('template')
template.innerHTML = SwitchTemplate

export const tagName = 'ui-switch'

export class Switch extends HTMLElement {
  #shadowRoot: ShadowRoot
  #input: HTMLInputElement

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
    this.#input = this.#shadowRoot.querySelector('input')!
  }

  reset (): void {
    this.#input.checked = false
    this.handleInputChange(false)
  }

  handleInputChange (checked: boolean): void {
    const evt = new CustomEvent('onChange', {
      detail: {
        value: checked
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)
  }

  connectedCallback (): void {
    this.#input.addEventListener('input', () => this.handleInputChange(this.#input.checked))
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange(this.#input.checked))
  }

  static get observedAttributes (): string[] {
    return [
      'data-aria-invalid',
      'errormessage'
    ]
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'data-aria-invalid':
          newVal === '' || newVal === 'true'
            ? this.#input.setAttribute('aria-invalid', '')
            : this.#input.removeAttribute('aria-invalid')
          break
        case 'errormessage':
          newVal
            ? this.addError(newVal)
            : this.removeError()
          break
        default:
          console.warn('Unknown attribute:', attrName)
      }
    }
  }

  addError = (errorMessage: string): void => {
    this.#input.classList.add('error')
    this.#input.setAttribute('aria-invalid', 'true')

    this.#shadowRoot.appendChild(fieldErrorTemplate.content.cloneNode(true))

    this.#shadowRoot.querySelector('p')!.innerText = errorMessage
  }

  removeError = (): void => {
    this.#input.classList.remove('error')
    this.#input.setAttribute('aria-invalid', 'false')

    const error = this.#shadowRoot.querySelector('p')
    error && this.#shadowRoot.removeChild(error)
  }
}
