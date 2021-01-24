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

  reset () {
    this.#input.value = ''
    this.handleInputChange('')
  }

  handleInputChange (value: string, removeLeadingZero: boolean = false) {
    this.classList.add('number')

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

  connectedCallback () {
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

  disconnectedCallback () {
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
