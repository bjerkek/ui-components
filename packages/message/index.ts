import { Message, tagName } from './message'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Message)
}
