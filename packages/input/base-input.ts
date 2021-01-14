import ErrorTemplate from './error-template.html'

const errorTemplate = document.createElement('template')
errorTemplate.innerHTML = ErrorTemplate

export default class BaseInput extends HTMLElement {
  static get observedAttributes () {
    return [
      'arialabel',
      'arialabelledby',
      'placeholder',
      'autocomplete',
      'maxlength',
      'minlength',
      'readonly',
      'spellcheck',
      'errormessage'
    ]
  }

  attributeChangedCallback (attrName: string, oldVal: string, newVal: string, input: HTMLInputElement, shadowRoot: ShadowRoot): void {
    if (newVal !== oldVal) {
      switch (attrName) {
        case 'arialabel':
          newVal
            ? input.setAttribute('aria-label', newVal)
            : input.removeAttribute('aria-label')
          break
        case 'arialabelledby':
          newVal
            ? input.setAttribute('aria-labelledby', newVal)
            : input.removeAttribute('aria-labelledby')
          break
        case 'placeholder':
        case 'autocomplete':
        case 'maxlength':
        case 'minlength':
          newVal
            ? input.setAttribute(attrName, newVal)
            : input.removeAttribute(attrName)
          break
        case 'readonly':
        case 'spellcheck':
          newVal === '' || newVal === 'true'
            ? input.setAttribute(attrName, '')
            : input.removeAttribute(attrName)
          break
        case 'errormessage':
          newVal
            ? this.addError(newVal, input, shadowRoot)
            : this.removeError(input, shadowRoot)
          break
        default:
          console.log('Changed unknown attribute:', attrName)
      }
    }
  }

  addError (errorMessage: string, input: HTMLInputElement, shadowRoot: ShadowRoot): void {
    input.classList.add('error')
    input.setAttribute('aria-invalid', 'true')

    shadowRoot.appendChild(errorTemplate.content.cloneNode(true))

    shadowRoot.querySelector('p')!.innerText = errorMessage
  }

  removeError (input: HTMLInputElement, shadowRoot: ShadowRoot): void {
    input.classList.remove('error')
    input.setAttribute('aria-invalid', 'false')

    const error = shadowRoot.querySelector('p')
    error && shadowRoot.removeChild(error)
  }
}
