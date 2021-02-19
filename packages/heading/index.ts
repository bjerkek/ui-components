import {
  Heading1,
  tagName1,
  Heading2,
  tagName2,
  Heading3,
  tagName3,
  Heading4,
  tagName4,
  Heading5,
  tagName5,
  Heading6,
  tagName6
} from './heading'

if (!window.customElements.get(tagName1)) {
  window.customElements.define(tagName1, Heading1)
}

if (!window.customElements.get(tagName2)) {
  window.customElements.define(tagName2, Heading2)
}

if (!window.customElements.get(tagName3)) {
  window.customElements.define(tagName3, Heading3)
}

if (!window.customElements.get(tagName4)) {
  window.customElements.define(tagName4, Heading4)
}

if (!window.customElements.get(tagName5)) {
  window.customElements.define(tagName5, Heading5)
}

if (!window.customElements.get(tagName6)) {
  window.customElements.define(tagName6, Heading6)
}
