import { RadioGroup, tagName } from './radio-group'

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, RadioGroup)
}
