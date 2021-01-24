import { Checkbox, tagName } from './checkbox'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Checkbox)
}
