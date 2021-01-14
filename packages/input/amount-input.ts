import BaseInput from './base-input'
import BaseInputStyles from './base-input-style.html'
import BaseInputTemplate from './base-input-template.html'

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + BaseInputTemplate

const seperatorFormatter = (value: string) => {
  const reversed = value.toString().split('').reverse().join('')
  const formatted = reversed.replace(/(\d{3}(?!$))/g, '$1' + ' ')
  const reversedBack = formatted.split('').reverse().join('')
  return reversedBack.toString()
}

export default class AmountInput extends BaseInput {
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

  handleInputChange (value: string) {
    let formattedValue = value
    const allowdecimals = this.hasAttribute('allowdecimals') || false
    const locale = this.getAttribute('locale') || 'no'
    const seperator = locale === 'en' ? '.' : ','
    // const seperatorRegex = allowdecimals ? new RegExp(`[^0-9${seperator}]`, 'g') : new RegExp(/\D/, 'g')
    const seperatorRegex = new RegExp(`[^0-9${allowdecimals && seperator}]`, 'g')

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

      // //Allow only 2 decimals
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

  connectedCallback () {
    this.#input.type = 'text'

    this.#input.addEventListener('input', () => this.handleInputChange(this.#input.value))

    if (this.hasAttribute('defaultvalue')) {
      const defaultvalue = this.#input.value && this.getAttribute('defaultvalue')
      this.handleInputChange(defaultvalue || '')
    }
  }

  static get observedAttributes () {
    return super.observedAttributes
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(attrName, oldVal, newVal, this.#input, this.#shadowRoot)
  }

  disconnectedCallback () {
    this.#input.removeEventListener('input', () => this.handleInputChange(this.#input.value))
  }
}
