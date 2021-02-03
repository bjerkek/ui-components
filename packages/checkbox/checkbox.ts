import CheckboxTemplate from './checkbox-template.html'
import ErrorTemplate from './error-template.html'

const template = document.createElement('template')
template.innerHTML = CheckboxTemplate

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

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
    this.handleInputChange(false)
  }

  handleInputChange (checked: boolean): void {
    const evt = new CustomEvent('onchange', {
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

    if (this.inline) {
      this.classList.add('inline')
      this.#label.classList.add('inline')
    }

    if (this.defaultchecked) {
      this.#input.checked = true
      this.handleInputChange(true)
    }
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange(this.#input.checked))
  }

  static get observedAttributes (): string[] {
    return [
      'arialabel',
      'arialabelledby',
      'errormessage'
    ]
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'arialabel':
          newVal
            ? this.#input.setAttribute('aria-label', newVal)
            : this.#input.removeAttribute('aria-label')
          break
        case 'arialabelledby':
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

    this.#shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

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
