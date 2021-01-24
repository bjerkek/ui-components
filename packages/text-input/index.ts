import { TextInput, tagName } from './text-input'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, TextInput)
}
