const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: block;
    }
    p {
      font-family: var(--ui-font-regular);
      color: var(--ui-text);
      line-height: 1.5rem;
      margin: 0 0 1rem 0;
    }
    @media (prefers-color-scheme: dark) {
      p {
        color: var(--ui-dark-text);
      }
    }
  </style>
  <p>
    <slot></slot>
  </p>`

export const tagName = 'ui-paragraph'

export class Paragraph extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
