import BaseInputStyles from './base-input-style.html'
import AmountInputTemplate from './amount-input-template.html'
import ErrorTemplate from './error-template.html'

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + AmountInputTemplate

const seperatorFormatter = (value: string) => {
  const reversed = value.toString().split('').reverse().join('')
  const formatted = reversed.replace(/(\d{3}(?!$))/g, '$1' + ' ')
  const reversedBack = formatted.split('').reverse().join('')
  return reversedBack.toString()
}

export const tagName = 'ui-amount-input'

export class AmountInput extends HTMLElement {
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
    let formattedValue = value
    const allowdecimals = this.hasAttribute('allowdecimals') || false
    const locale = this.getAttribute('locale') || 'no'
    const seperator = locale === 'en' ? '.' : ','
    const seperatorRegex = allowdecimals ? new RegExp(`[^0-9${seperator}]`, 'g') : /[^0-9]/g

    // Remove leading zero
    formattedValue =
      value.startsWith('0') && value.length > 1 &&
        !value.includes('.') &&
        !value.includes(',')
        ? value.slice(1)
        : value

    // Allow only numbers, dots and commas (according to allowDecimals)
    formattedValue = formattedValue.replace(seperatorRegex, '')

    if (allowdecimals) {
      // Remove leading dot and comma
      formattedValue = formattedValue.startsWith(seperator) ? formattedValue.slice(1) : formattedValue

      // Allow only one seperator
      const seperatorCount = (formattedValue.match(new RegExp(`[${seperator}]`, 'g')) || []).length
      formattedValue = seperatorCount > 1 ? formattedValue.slice(0, -1) : formattedValue

      // Allow only 2 decimals
      const parts = formattedValue.split(`${seperator}`)
      formattedValue = parts.length > 1 && parts[1].length > 2 ? formattedValue.slice(0, -1) : formattedValue
    }

    // Thousand seperator
    formattedValue = seperatorFormatter(formattedValue)

    // Add to view
    this.classList.add('number')
    this.#input.value = formattedValue

    // Remove thousand seperator
    let valueRemovedFormatting = formattedValue.replace(/ /g, '')

    // Remove seperator
    valueRemovedFormatting = valueRemovedFormatting.includes(seperator)
      ? valueRemovedFormatting.replace(new RegExp(`[${seperator}]`, 'g'), '')
      : `${valueRemovedFormatting}00`

    // Add missing zeros
    valueRemovedFormatting = formattedValue.endsWith(seperator) ? `${valueRemovedFormatting}00` : valueRemovedFormatting
    valueRemovedFormatting = formattedValue.match(new RegExp(`${seperator}\\d$`, 'g')) ? `${valueRemovedFormatting}0` : valueRemovedFormatting

    const evt = new CustomEvent('onchange', {
      detail: {
        value: valueRemovedFormatting
      },
      bubbles: true,
      composed: true
    })

    this.dispatchEvent(evt)
  }

  connectedCallback (): void {
    this.#input.type = 'text'

    this.#input.addEventListener('input', () => this.handleInputChange(this.#input.value))

    if (this.hasAttribute('defaultvalue')) {
      const defaultvalue = this.#input.value && this.getAttribute('defaultvalue')
      this.handleInputChange(defaultvalue || '')
    }
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
