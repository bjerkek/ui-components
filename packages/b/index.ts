import HTMLTemplate from './template.html'

const template = document.createElement('template')
template.innerHTML = HTMLTemplate

class Button extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('my-button', Button)
