import { Button, tagName } from './button'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Button)
}
