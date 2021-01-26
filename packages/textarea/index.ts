import { Textarea, tagName } from './textarea'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Textarea)
}
