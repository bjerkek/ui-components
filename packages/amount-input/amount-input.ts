import BaseInputStyles from './base-input-style.html'
import AmountInputTemplate from './amount-input-template.html'
import FieldErrorTemplate from './field-error-template.html'

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + AmountInputTemplate

const fieldErrorTemplate = document.createElement('template')
fieldErrorTemplate.innerHTML = FieldErrorTemplate

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

  get id (): string {
    return this.getAttribute('data-id') || ''
  }

  get locale (): string {
    return this.getAttribute('locale') || 'no'
  }

  get allowdecimals (): boolean {
    return this.hasAttribute('allowdecimals')
  }

  reset (): void {
    this.#input.value = ''
    this.handleInputChange('')
  }

  handleInputChange (value: string): void {
    let formattedValue = value
    const seperator = this.locale === 'en' ? '.' : ','
    const seperatorRegex = this.allowdecimals ? new RegExp(`[^0-9${seperator}]`, 'g') : /[^0-9]/g

    // Remove leading zero
    formattedValue =
      value.startsWith('0') && value.length > 1 &&
        !value.includes('.') &&
        !value.includes(',')
        ? value.slice(1)
        : value

    // Allow only numbers, dots and commas (according to allowDecimals)
    formattedValue = formattedValue.replace(seperatorRegex, '')

    if (this.allowdecimals) {
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
    if (this.id) {
      this.#input.id = this.id
    }

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
