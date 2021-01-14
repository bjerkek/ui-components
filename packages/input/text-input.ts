import BaseInput from './base-input'
import BaseInputStyles from './base-input-style.html'
import BaseInputTemplate from './base-input-template.html'

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + BaseInputTemplate

export default class TextInput extends BaseInput {
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

    if (this.hasAttribute('defaultvalue')) {
      const defaultvalue = this.#input.value && this.getAttribute('defaultvalue')
      this.handleInputChange(defaultvalue || '')
    }
  }

  static get observedAttributes () {
    return super.observedAttributes
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    super.attributeChangedCallback(attrName, oldVal, newVal, this.#input, this.#shadowRoot)
  }

  disconnectedCallback (): void {
    this.#input.removeEventListener('input', () => this.handleInputChange(this.#input.value.toString()))
  }
}
