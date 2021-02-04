import { FieldError, tagName } from './field-error'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, FieldError)
}
