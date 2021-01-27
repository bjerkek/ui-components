import LabelTemplate from './label-template.html'

const template = document.createElement('template')
template.innerHTML = LabelTemplate

export const tagName = 'ui-label'

export class Label extends HTMLElement {
  #shadowRoot: ShadowRoot
  #label: HTMLLabelElement

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#label = this.#shadowRoot.querySelector('label')!
  }

  get label (): string {
    return this.getAttribute('label') || ''
  }

  get sublabel (): string {
    return this.getAttribute('sublabel') || ''
  }

  get htmlFor (): string {
    return this.getAttribute('htmlFor') || ''
  }

  setLabel (label: string, subLabel: string) {
    this.#label.innerHTML = subLabel
      ? `${label}<small>${subLabel}</small>`
      : label
  }

  connectedCallback () {
    if (this.htmlFor) {
      this.#label.htmlFor = this.getAttribute('htmlFor')!
    }

    this.setLabel(this.label, this.sublabel)
  }
}
