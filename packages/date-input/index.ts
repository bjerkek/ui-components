import { DateInput, tagName } from './date-input'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, DateInput)
}
