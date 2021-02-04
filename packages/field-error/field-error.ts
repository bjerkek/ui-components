import FieldErrorTemplate from './field-error-template.html'

const template = document.createElement('template')
template.innerHTML = FieldErrorTemplate

export const tagName = 'ui-field-error'

export class FieldError extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
