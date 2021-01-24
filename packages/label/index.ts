import { Label, tagName } from './label'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, Label)
}
