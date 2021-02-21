const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: inline-block;
    }
    
    em {
      font-family: var(--ui-font-regular);
      color: var(--ui-text);
    }
    
    @media (prefers-color-scheme: dark) {
      em {
        color: var(--ui-dark-text);
      }
    }
  </style>
  <em>
    <slot></slot>
  </em>`

export const tagName = 'ui-emphasized-text'

export class Emphasized extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
