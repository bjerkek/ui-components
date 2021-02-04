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

  get id (): string {
    return this.getAttribute('data-id') || ''
  }

  get defaultvalue (): string {
    return this.getAttribute('defaultvalue') || ''
  }

  reset (): void {
    this.#input.value = ''
    this.handleInputChange()
  }

  handleInputChange (): void {
    const evt = new CustomEvent('onchange', {
      detail: {
        value: this.#input.value.toString()
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)
  }

  connectedCallback (): void {
    if (this.id) {
      this.#input.id = this.id
    }

    this.#input.value = this.defaultvalue
    this.#input.addEventListener('input', () => this.handleInputChange())
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange())
  }

  static get observedAttributes (): string[] {
    return [
      'data-aria-label',
      'data-aria-labelledby',
      'data-placeholder',
      'data-autocomplete',
      'data-maxlength',
      'data-minlength',
      'data-readonly',
      'data-spellcheck',
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
        case 'data-placeholder':
          newVal
            ? this.#input.setAttribute('placeholder', newVal)
            : this.#input.removeAttribute(attrName)
          break
        case 'data-autocomplete':
          newVal
            ? this.#input.setAttribute('autocomplete', newVal)
            : this.#input.removeAttribute(attrName)
          break
        case 'data-maxlength':
          newVal
            ? this.#input.setAttribute('maxlength', newVal)
            : this.#input.removeAttribute(attrName)
          break
        case 'data-minlength':
          newVal
            ? this.#input.setAttribute('minlength', newVal)
            : this.#input.removeAttribute(attrName)
          break
        case 'data-readonly':
          newVal === '' || newVal === 'true'
            ? this.#input.setAttribute('readonly', '')
            : this.#input.removeAttribute(attrName)
          break
        case 'data-spellcheck':
          newVal === '' || newVal === 'true'
            ? this.#input.setAttribute('spellcheck', '')
            : this.#input.removeAttribute(attrName)
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

    this.#shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

    this.#shadowRoot.querySelector('p')!.innerText = errorMessage
  }

  removeError = (): void => {
    this.#input.classList.remove('error')
    this.#input.setAttribute('aria-invalid', 'false')

    const error = this.#shadowRoot.querySelector('p')
    error && this.#shadowRoot.removeChild(error)
  }
}
