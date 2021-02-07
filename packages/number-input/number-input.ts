import BaseInputStyles from './base-input-style.html'
import NumberInputTemplate from './number-input-template.html'
import FieldErrorTemplate from './field-error-template.html'

const fieldErrorTemplate = document.createElement('template')
fieldErrorTemplate.innerHTML = FieldErrorTemplate

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

  get id (): string {
    return this.getAttribute('data-id') || ''
  }

  get removeLeadingZero (): boolean {
    return this.hasAttribute('removeleadingzero')
  }

  get defaultvalue (): string {
    return this.getAttribute('defaultvalue') || ''
  }

  reset (): void {
    this.#input.value = ''
    this.handleInputChange()
  }

  handleInputChange (): void {
    let formattedValue = this.#input.value.replace(/\D/g, '')

    if (this.removeLeadingZero) {
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
    if (this.id) {
      this.#input.id = this.id
    }

    this.#input.value = this.defaultvalue.replace(/\D/g, '')
    this.#input.addEventListener('input', () => this.handleInputChange())
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange())
  }

  static get observedAttributes (): string[] {
    return [
      'data-aria-label',
      'data-aria-labelledby',
      'data-aria-invalid',
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
        case 'data-aria-invalid':
          newVal === '' || newVal === 'true'
            ? this.#input.setAttribute('aria-invalid', '')
            : this.#input.removeAttribute('aria-invalid')
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
