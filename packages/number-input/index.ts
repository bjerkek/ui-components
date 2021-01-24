import { NumberInput, tagName } from './number-input'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, NumberInput)
}
