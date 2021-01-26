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

  get maxlength (): string {
    return this.getAttribute('maxlength') || ''
  }

  reset (): void {
    this.#textarea.value = ''
    this.handleTextareaChange('')
  }

  handleTextareaChange (value: string): void {
    const evt = new CustomEvent('onChange', {
      detail: {
        value
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)
  }

  setCounter (maxLength: number, textLength: number): void {
    this.#counter.innerHTML = (maxLength - textLength).toString()
  }

  connectedCallback (): void {
    if (this.maxlength) {
      this.#counter.classList.remove('hide')
      this.#textarea.setAttribute('maxlength', this.maxlength)
      this.#counter.innerHTML = this.maxlength
      this.#textarea.addEventListener('input', () => this.setCounter(parseInt(this.maxlength), this.#textarea.value.length))
    }

    this.#textarea.addEventListener('input', () => this.handleTextareaChange(this.#textarea.value.toString()))
  }

  disconnectedCallback (): void {
    this.#textarea.removeEventListener('input', () => this.handleTextareaChange(this.#textarea.value.toString()))
    if (this.maxlength) {
      this.#textarea.removeEventListener('input', () => this.setCounter(parseInt(this.maxlength), this.#textarea.value.length))
    }
  }

  static get observedAttributes (): string[] {
    return [
      'arialabel',
      'arialabelledby',
      'readonly',
      'spellcheck',
      'errormessage'
    ]
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string) {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'arialabel':
          newVal
            ? this.#textarea.setAttribute('aria-label', newVal)
            : this.#textarea.removeAttribute('aria-label')
          break
        case 'arialabelledby':
          newVal
            ? this.#textarea.setAttribute('aria-labelledby', newVal)
            : this.#textarea.removeAttribute('aria-labelledby')
          break
        case 'readonly':
        case 'spellcheck':
          newVal === '' || newVal === 'true'
            ? this.#textarea.setAttribute(attrName, '')
            : this.#textarea.removeAttribute(attrName)
          break
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

  // TODO: query by class error?
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
