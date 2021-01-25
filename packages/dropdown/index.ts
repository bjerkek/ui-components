import { Dropdown, tagName } from './dropdown'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Dropdown)
}
