import CheckboxTemplate from './checkbox-template.html'
import FieldErrorTemplate from './field-error-template.html'

const template = document.createElement('template')
template.innerHTML = CheckboxTemplate

const fieldErrorTemplate = document.createElement('template')
fieldErrorTemplate.innerHTML = FieldErrorTemplate

export const tagName = 'ui-checkbox'

export class Checkbox extends HTMLElement {
  #shadowRoot: ShadowRoot
  #input: HTMLInputElement
  #label: HTMLLabelElement

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#input = this.#shadowRoot.querySelector('input')!
    this.#label = this.#shadowRoot.querySelector('label')!
  }

  get inline (): boolean {
    return this.hasAttribute('inline')
  }

  get defaultchecked (): boolean {
    return this.hasAttribute('defaultchecked')
  }

  reset (): void {
    this.#input.checked = false
    this.handleInputChange()
  }

  handleInputChange (): void {
    const evt = new CustomEvent('onchange', {
      detail: {
        value: this.#input.checked
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)
  }

  connectedCallback (): void {
    this.#input.addEventListener('input', () => this.handleInputChange())

    if (this.inline) {
      this.classList.add('inline')
      this.#label.classList.add('inline')
    }

    if (this.defaultchecked) {
      this.#input.checked = true
      this.handleInputChange()
    }
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange())
  }

  static get observedAttributes (): string[] {
    return [
      'data-aria-label',
      'data-aria-labelledby',
      'errormessage'
    ]
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'data-aria-label':
          newVal
            ? this.#input.setAttribute('aria-label', newVal)
            : this.#input.removeAttribute('aria-label')
          break
        case 'data-aria-labelledby':
          newVal
            ? this.#input.setAttribute('aria-labelledby', newVal)
            : this.#input.removeAttribute('aria-labelledby')
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

  addError (errorMessage: string): void {
    this.#label.classList.add('error')
    this.#input.setAttribute('aria-invalid', 'true')

    this.#shadowRoot.appendChild(fieldErrorTemplate.content.cloneNode(true))

    const error = this.#shadowRoot.querySelector('p')!
    error.innerText = errorMessage
  }

  removeError () {
    this.#label.classList.remove('error')
    this.#input.setAttribute('aria-invalid', 'false')

    const error = this.#shadowRoot.querySelector('p')!
    error && this.#shadowRoot.removeChild(error)
  }
}
