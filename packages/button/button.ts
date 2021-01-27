import ButtonTemplate from './button-template.html'
import LoadingTemplate from './loading-template.html'

const template = document.createElement('template')
template.innerHTML = ButtonTemplate

const loadingTemplate = document.createElement('template')
loadingTemplate.innerHTML = LoadingTemplate

export const tagName = 'ui-button'

export class Button extends HTMLElement {
  #shadowRoot: ShadowRoot
  #button: HTMLButtonElement

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#button = this.#shadowRoot.querySelector('button')!
  }

  get type (): string {
    return this.getAttribute('type') || 'button'
  }

  get kind (): string {
    return this.getAttribute('kind') || 'default'
  }

  handleButtonClick (event: Event): void {
    const form = this.#shadowRoot.host.closest('form')

    if (form && this.type === 'submit') {
      event.preventDefault()
      const fakeSubmit = document.createElement('button')
      fakeSubmit.type = 'submit'
      fakeSubmit.style.display = 'none'
      form.appendChild(fakeSubmit)
      fakeSubmit.click()
      fakeSubmit.remove()
    } else {
      this.dispatchEvent(new CustomEvent('onclick', {
        bubbles: true,
        composed: true
      }))
    }
  }

  connectedCallback (): void {
    this.#button.type = this.type
    if (this.kind === 'default') {
      this.#button.classList.add('default')
    }
    this.#button.addEventListener('click', event => this.handleButtonClick(event))
  }

  disconnectedCallback (): void {
    this.#button.removeEventListener('click', event => this.handleButtonClick(event))
  }

  static get observedAttributes (): string[] {
    return ['disabled', 'kind', 'loading']
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'disabled':
          (newVal === '' || newVal === 'true' || newVal === 'disabled')
            ? this.setDisabled(true)
            : this.setDisabled(false)
          break
        case 'kind':
          this.changeStyle(newVal)
          break
        case 'loading':
          (newVal === '' || newVal === 'true' || newVal === 'loading')
            ? this.setLoading(true)
            : this.setLoading(false)
          break
        default:
          console.log('Changed unknown attribute:', attrName)
      }
    }
  }

  changeStyle (kind: string): void {
    this.resetStyle()
    switch (kind) {
      case 'primary':
        this.#button.classList.add('primary')
        break
      case 'danger':
        this.#button.classList.add('danger')
        break
      case 'link':
        this.#button.classList.add('link')
        break
      default:
        this.#button.classList.add('default')
    }
  }

  resetStyle (): void {
    this.#button.classList.remove('primary', 'danger', 'link', 'default')
  }

  setDisabled (disabled: boolean): void {
    disabled
      ? this.#button.setAttribute('disabled', '')
      : this.#button.removeAttribute('disabled')
  }

  setLoading (loading: boolean): void {
    if (loading) {
      this.setDisabled(true)
      setTimeout(() => {
        this.#button.appendChild(loadingTemplate.content.cloneNode(true))
      }, 750)
    } else {
      this.setDisabled(false)
      const svgContainer = this.#button.querySelector('.loadingContainer')
      svgContainer && this.#button.removeChild(svgContainer)
    }
  }
}
