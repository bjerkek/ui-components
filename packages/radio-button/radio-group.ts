import RadioGroupTemplate from './radio-group-template.html'
import RadioButtonTemplate from './radio-button-template.html'
import ErrorTemplate from './error-template.html'

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

const template = document.createElement('template')
template.innerHTML = RadioGroupTemplate

const radioButtonTemplate = document.createElement('template')
radioButtonTemplate.innerHTML = RadioButtonTemplate

export const tagName = 'ui-radio-group'

export class RadioGroup extends HTMLElement {
  #shadowRoot: ShadowRoot
  #radioButtons: HTMLInputElement[]

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))
    this.#radioButtons = Array.from(this.querySelectorAll('ui-radio-button'))
  }

  get name (): string {
    return this.getAttribute('name') || 'ui-radio-button'
  }

  get inline (): boolean {
    return this.hasAttribute('inline')
  }

  connectedCallback (): void {
    this.#radioButtons.forEach((radio, index) => {
      const radioEl = radioButtonTemplate.content.cloneNode(true) as HTMLDivElement

      const input = radioEl.querySelector('input')! as HTMLInputElement
      const label = radioEl.querySelector('label')! as HTMLLabelElement

      input.id = `ui-radio-input-${index}`
      input.name = this.name
      input.value = radio.getAttribute('value') || ''

      label.innerHTML = radio.innerHTML
      label.setAttribute('for', `ui-radio-input-${index}`)

      if (this.inline) {
        label.style.width = 'auto'
        label.style.marginRight = '2rem'
      }

      input.addEventListener('change', () => {
        const evt = new CustomEvent('onchange', {
          detail: {
            value: input.value
          },
          bubbles: true,
          composed: true
        })
        this.dispatchEvent(evt)
      })

      const error = this.#shadowRoot.querySelector('p')

      if (error) {
        input.setAttribute('aria-invalid', 'true')
        label.classList.add('error')
        this.#shadowRoot.insertBefore(radioEl, error)
        return
      }

      this.#shadowRoot.appendChild(radioEl)
    })

    this.#radioButtons.forEach(n => n.remove())
  }

  disconnectedCallback (): void {}

  static get observedAttributes (): string[] {
    return ['errormessage']
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'errormessage':
          newVal
            ? this.addError(newVal)
            : this.removeError()
          break
        default:
          console.log('Changed unknown attribute:', attrName)
      }
    }
  }

  addError = (errorMessage: string): void => {
    this.#shadowRoot.querySelectorAll('input').forEach(element => {
      element.setAttribute('aria-invalid', 'true')
    })

    this.#shadowRoot.querySelectorAll('label').forEach(element => {
      element.classList.add('error')
    })

    this.#shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

    this.#shadowRoot.querySelector('p')!.innerText = errorMessage
  }

  removeError = (): void => {
    this.#shadowRoot.querySelectorAll('input').forEach(element => {
      element.setAttribute('aria-invalid', 'false')
    })

    this.#shadowRoot.querySelectorAll('label').forEach(element => {
      element.classList.remove('error')
    })

    const error = this.#shadowRoot.querySelector('p')
    error && this.#shadowRoot.removeChild(error)
  }
}
