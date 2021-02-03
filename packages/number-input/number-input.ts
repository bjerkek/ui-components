import BaseInputStyles from './base-input-style.html'
import NumberInputTemplate from './number-input-template.html'
import ErrorTemplate from './error-template.html'

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + NumberInputTemplate

export const tagName = 'ui-number-input'

export class NumberInput extends HTMLElement {
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

  handleInputChange (value: string, removeLeadingZero: boolean = false): void {
    let formattedValue = value.replace(/\D/g, '')

    if (removeLeadingZero) {
      formattedValue = formattedValue.startsWith('0') && formattedValue.length > 1 ? formattedValue.slice(1) : formattedValue
    }

    this.#input.value = formattedValue

    const evt = new CustomEvent('onchange', {
      detail: {
        value: formattedValue
      },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(evt)
  }

  connectedCallback (): void {
    let removeLeadingZero = false

    if (this.hasAttribute('removeleadingzero')) {
      removeLeadingZero = true
    }

    this.#input.addEventListener('input', () => this.handleInputChange(this.#input.value, removeLeadingZero))

    // if (this.hasAttribute('defaultvalue')) {
    //     const defaultvalue = this.#input.value = this.getAttribute('defaultvalue')
    //     this.handleInputChange(defaultvalue, removeLeadingZero)
    // }
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange(this.#input.value))
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
