import { AmountInput, tagName } from './amount-input'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, AmountInput)
}
