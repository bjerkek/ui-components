import MessageTemplate from './message-template.html'
import SuccessSvg from './icons/success.svg'
import InfoSvg from './icons/info.svg'
import CriticalSvg from './icons/critical.svg'

const template = document.createElement('template')
template.innerHTML = MessageTemplate

export const tagName = 'ui-message'

export class Message extends HTMLElement {
  #shadowRoot: ShadowRoot
  #message: HTMLDivElement
  #icon: HTMLDivElement
  #title: HTMLParagraphElement
  #dismiss: HTMLButtonElement
  #actionsContainer: HTMLDivElement
  #primary: HTMLButtonElement
  #secondary: HTMLButtonElement

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#message = this.#shadowRoot.querySelector('.message') as HTMLDivElement
    this.#icon = this.#shadowRoot.querySelector('.icon') as HTMLDivElement
    this.#title = this.#shadowRoot.querySelector('.title') as HTMLParagraphElement
    this.#dismiss = this.#shadowRoot.querySelector('.dismiss') as HTMLButtonElement
    this.#actionsContainer = this.#shadowRoot.querySelector('.actions') as HTMLDivElement
    this.#primary = this.#shadowRoot.querySelector('.primary') as HTMLButtonElement
    this.#secondary = this.#shadowRoot.querySelector('.secondary') as HTMLButtonElement
  }

  get title (): string {
    return this.getAttribute('data-title') || ''
  }

  get type (): string {
    return this.getAttribute('data-type') || 'info'
  }

  get primary (): string {
    return this.getAttribute('data-action') || ''
  }

  get secondary (): string {
    return this.getAttribute('data-action-secondary') || ''
  }

  handleDismissClick (): void {
    this.dispatchEvent(new CustomEvent('dismissclick', {
      bubbles: true,
      composed: true
    }))

    this.#message.remove()
  }

  renderActions (): void {
    if (!this.primary && !this.secondary) {
      this.#actionsContainer.remove()
      return
    }

    if (this.primary) {
      this.#primary.innerText = this.primary
      this.#primary.addEventListener('click', () => this.dispatchEvent(new CustomEvent('primaryclick', {
        bubbles: true,
        composed: true
      })))
    } else {
      this.#primary.remove()
    }

    if (this.secondary) {
      this.#secondary.innerText = this.secondary
      this.#secondary.addEventListener('click', () => this.dispatchEvent(new CustomEvent('secondaryclick', {
        bubbles: true,
        composed: true
      })))
    } else {
      this.#secondary.remove()
    }
  }

  renderTitle (): void {
    if (!this.title) {
      this.#title.remove()
      return
    }

    this.#title.innerHTML = this.title
  }

  connectedCallback (): void {
    switch (this.type) {
      case 'success':
        this.#icon.innerHTML = SuccessSvg
        this.#message.classList.add('success')
        this.#message.setAttribute('role', 'status')
        break
      case 'info':
        this.#icon.innerHTML = InfoSvg
        this.#message.classList.add('info')
        this.#message.setAttribute('role', 'status')
        break
      case 'critical':
        this.#icon.innerHTML = CriticalSvg
        this.#message.classList.add('critical')
        this.#message.setAttribute('role', 'alert')
        break
      default:
        this.#icon.remove()
        break
    }

    this.renderTitle()
    this.renderActions()

    this.#dismiss.addEventListener('click', () => this.handleDismissClick())
  }

  disconnectedCallback (): void {
    this.#dismiss.removeEventListener('click', () => this.handleDismissClick())
  }
}
