const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: inline-block;
    }
    a {
      font-family: var(--ui-font-regular);
      color: var(--ui-primary);
      text-decoration: underline;
    }
    a:hover {
      color: var(--ui-heading);
    }
  </style>
  <a>
    <slot></slot>
  </a>`

export const tagName = 'ui-link-text'

export class Link extends HTMLElement {
  #shadowRoot: ShadowRoot
  #anchor: HTMLAnchorElement

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
    this.#anchor = this.#shadowRoot.querySelector('a')!
  }

  connectedCallback (): void {
    const href = this.getAttribute('data-href') || ''
    href && this.#anchor.setAttribute('href', href)
  }
}
