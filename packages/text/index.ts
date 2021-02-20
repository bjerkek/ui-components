import { Paragraph, tagName as paragraphTagname } from './paragraph'
import { Emphasized, tagName as emphasizedTagname } from './emphasized'
import { Micro, tagName as microTagname } from './micro'
import { Small, tagName as smallTagname } from './small'
import { Strong, tagName as strongTagname } from './strong'
import { Link, tagName as linkTagname } from './link'

if (!window.customElements.get(paragraphTagname)) window.customElements.define(paragraphTagname, Paragraph)
if (!window.customElements.get(emphasizedTagname)) window.customElements.define(emphasizedTagname, Emphasized)
if (!window.customElements.get(microTagname)) window.customElements.define(microTagname, Micro)
if (!window.customElements.get(smallTagname)) window.customElements.define(smallTagname, Small)
if (!window.customElements.get(strongTagname)) window.customElements.define(strongTagname, Strong)
if (!window.customElements.get(linkTagname)) window.customElements.define(linkTagname, Link)
