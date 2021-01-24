import BaseInputStyles from './base-input-style.html'
import TextInputTemplate from './text-input-template.html'
import ErrorTemplate from './error-template.html'

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + TextInputTemplate

export const tagName = 'ui-text-input'

export class TextInput extends HTMLElement {
  #shadowRoot: ShadowRoot
  #input: HTMLInputElement

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
    this.#input = this.#shadowRoot.querySelector('input')!
  }

  reset (): void {
    this.#input.value = ''
    this.handleInputChange('')
  }

  handleInputChange (value: string): void {
    const evt = new CustomEvent('onchange', {
      detail: {
        value
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)
  }

  connectedCallback (): void {
    this.#input.type = 'text'

    this.#input.addEventListener('input', () => this.handleInputChange(this.#input.value.toString()))

    // if (this.hasAttribute('defaultvalue')) {
    //     const defaultvalue = this.#input.value = this.getAttribute('defaultvalue')
    //     this.handleInputChange(defaultvalue)
    // }
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange(this.#input.value.toString()))
  }

  static get observedAttributes (): string[] {
    return [
      'arialabel',
      'arialabelledby',
      'placeholder',
      'autocomplete',
      'maxlength',
      'minlength',
      'readonly',
      'spellcheck',
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
        case 'placeholder':
        case 'autocomplete':
        case 'maxlength':
        case 'minlength':
          newVal
            ? this.#input.setAttribute(attrName, newVal)
            : this.#input.removeAttribute(attrName)
          break
        case 'readonly':
        case 'spellcheck':
          newVal === '' || newVal === 'true'
            ? this.#input.setAttribute(attrName, '')
            : this.#input.removeAttribute(attrName)
          break
        case 'errormessage':
          newVal
            ? this.addError(newVal, this.#input, this.#shadowRoot)
            : this.removeError(this.#input, this.#shadowRoot)
          break
        default:
          console.log('Changed unknown attribute:', attrName)
      }
    }
  }

  addError = (errorMessage: string, input: HTMLInputElement, shadowRoot: ShadowRoot): void => {
    input.classList.add('error')
    input.setAttribute('aria-invalid', 'true')

    shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

    shadowRoot.querySelector('p')!.innerText = errorMessage
  }

  removeError = (input: HTMLInputElement, shadowRoot: ShadowRoot): void => {
    input.classList.remove('error')
    input.setAttribute('aria-invalid', 'false')

    const error = shadowRoot.querySelector('p')
    error && shadowRoot.removeChild(error)
  }
}