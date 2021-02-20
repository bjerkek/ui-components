const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: inline-block;
    }
    strong {
      font-family: var(--ui-font-regular);
      color: var(--ui-text);
    }
  </style>
  <strong>
    <slot></slot>
  </strong>`

export const tagName = 'ui-strong-text'

export class Strong extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
