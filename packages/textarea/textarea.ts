import TextareaTemplate from './textarea-template.html'
import BaseInputStyles from './base-input-style.html'
import ErrorTemplate from './error-template.html'

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + TextareaTemplate

export const tagName = 'ui-textarea'

export class Textarea extends HTMLElement {
  #shadowRoot: ShadowRoot
  #textarea: HTMLTextAreaElement
  #counter: HTMLDivElement

  constructor () {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#textarea = this.#shadowRoot.querySelector('textarea')!
    this.#counter = this.#shadowRoot.querySelector('div')!
  }

  get defaultvalue (): string {
    return this.getAttribute('defaultvalue') || ''
  }

  get maxlength (): string {
    return this.getAttribute('data-maxlength') || ''
  }

  reset (): void {
    this.#textarea.value = ''
    this.handleTextareaChange()
  }

  handleTextareaChange (): void {
    const evt = new CustomEvent('onchange', {
      detail: {
        value: this.#textarea.value.toString()
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)
  }

  setCounter (): void {
    this.#counter.innerHTML = (parseInt(this.maxlength) - this.#textarea.value.length).toString()
  }

  connectedCallback (): void {
    this.#textarea.value = this.defaultvalue

    if (this.maxlength) {
      this.#counter.classList.remove('hide')
      this.#textarea.setAttribute('maxlength', this.maxlength)
      this.#counter.innerHTML = this.maxlength
      this.#textarea.addEventListener('input', () => this.setCounter())
    }

    this.#textarea.addEventListener('input', () => this.handleTextareaChange())
  }

  disconnectedCallback (): void {
    this.#textarea.removeEventListener('input', () => this.handleTextareaChange())
    if (this.maxlength) {
      this.#textarea.removeEventListener('input', () => this.setCounter())
    }
  }

  static get observedAttributes (): string[] {
    return [
      'data-aria-label',
      'data-aria-labelledby',
      'data-readonly',
      'data-spellcheck',
      'errormessage'
    ]
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string) {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'data-aria-label':
          newVal
            ? this.#textarea.setAttribute('aria-label', newVal)
            : this.#textarea.removeAttribute('aria-label')
          break
        case 'data-aria-labelledby':
          newVal
            ? this.#textarea.setAttribute('aria-labelledby', newVal)
            : this.#textarea.removeAttribute('aria-labelledby')
          break
        case 'data-readonly':
          newVal === '' || newVal === 'true'
            ? this.#textarea.setAttribute('readonly', '')
            : this.#textarea.removeAttribute(attrName)
          break
        case 'data-spellcheck':
          newVal === '' || newVal === 'true'
            ? this.#textarea.setAttribute('spellcheck', '')
            : this.#textarea.removeAttribute(attrName)
          break
        case 'errormessage':
          newVal
            ? this.addError(newVal)
            : this.removeError()
          break
        default:
          console.warn('Unknown attribute:', attrName)
      }
    }
  }

  addError = (errorMessage: string): void => {
    this.#textarea.classList.add('error')
    this.#textarea.setAttribute('aria-invalid', 'true')

    this.#shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

    this.#shadowRoot.querySelector('p')!.innerText = errorMessage
  }

  removeError = (): void => {
    this.#textarea.classList.remove('error')
    this.#textarea.setAttribute('aria-invalid', 'false')

    const error = this.#shadowRoot.querySelector('p')
    error && this.#shadowRoot.removeChild(error)
  }
}
