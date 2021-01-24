import { Switch, tagName } from './switch'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Switch)
}
