const template = document.createElement('template')

template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }
  </style>
 
  <div class="container">
    <button>Label</button>
  </div>
`

class Button extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('my-button', Button)
