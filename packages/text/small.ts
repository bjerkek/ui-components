const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: inline-block;
    }
    span {
      font-size: 0.9rem;
      font-family: var(--ui-font-regular);
      color: var(--ui-text-light);
    }
  </style>
  <span>
    <slot></slot>
  </span>`

export const tagName = 'ui-small-text'

export class Small extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
