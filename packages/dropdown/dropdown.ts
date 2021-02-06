import DropdownTemplate from './dropdown-template.html'
import FieldErrorTemplate from './field-error-template.html'
import BaseInputStyles from './base-input-style.html'

const template = document.createElement('template')
template.innerHTML = BaseInputStyles + DropdownTemplate

const fieldErrorTemplate = document.createElement('template')
fieldErrorTemplate.innerHTML = FieldErrorTemplate

const optionTemplate = document.createElement('template')
optionTemplate.innerHTML = `
  <div class="option" role="option"></div>
`

const subTitleTemplate = document.createElement('template')
subTitleTemplate.innerHTML = `
  <small></small>
`

const emptySearchTemplate = document.createElement('template')
emptySearchTemplate.innerHTML = `
  <div class="empty-search"></div>
`

export const tagName = 'ui-dropdown'

export class Dropdown extends HTMLElement {
  #shadowRoot: ShadowRoot
  #container: HTMLDivElement
  #input: HTMLInputElement
  #optionsWrapper: HTMLDivElement
  #arrowButton: HTMLButtonElement
  #overlay: HTMLDivElement
  #array: {
    value: string,
    name: string,
    subtitle: string
  }[]

  constructor () {
    super()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(template.content.cloneNode(true))

    this.#input = this.#shadowRoot.querySelector('input')!
    this.#optionsWrapper = this.#shadowRoot.querySelector('.options')! as HTMLDivElement
    this.#arrowButton = this.#shadowRoot.querySelector('#arrowButton')! as HTMLButtonElement
    this.#overlay = this.#shadowRoot.querySelector('.overlay')! as HTMLDivElement
    this.#container = this.#shadowRoot.querySelector('[role="listbox"]')! as HTMLDivElement

    this.#array = []
  }

  get id (): string {
    return this.getAttribute('data-id') || ''
  }

  get isSearchable (): boolean {
    return this.hasAttribute('searchable')
  }

  get isSubtitleSearchable (): boolean {
    return this.hasAttribute('searchablesubtitle')
  }

  get placeholder (): string {
    return this.getAttribute('placeholder') || ''
  }

  get emptysearchtext (): string {
    return this.getAttribute('emptysearchtext') || ''
  }

  reset (): void {
    this.#input.value = ''
  }

  handleInputChange (): void {
    const value = this.#input.getAttribute('data-value')!

    this.renderDropdown()

    const evt = new CustomEvent('onChange', {
      detail: {
        value
      },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(evt)

    const selectedOption = this.#optionsWrapper.querySelector('[aria-selected="true"]')!
    this.#container.setAttribute('aria-activedescendant', selectedOption?.id || '')
  }

  handleInputClick (): void {
    if (this.#optionsWrapper.classList.contains('open')) {
      return
    }
    this.toggleDropdown()
  }

  handleInputKeyDown (event: KeyboardEvent): void {
    // Esc key
    if (event.key === 'Escape' && this.#optionsWrapper.classList.contains('open')) {
      this.toggleDropdown()
      return
    }

    // All keys except enter, Esc and tab
    if (event.key !== 'Enter' && event.key !== 'Escape' && event.key !== 'Tab' && !this.#optionsWrapper.classList.contains('open')) {
      this.toggleDropdown()
      return
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter' || event.key === 'Home' || event.key === 'End') {
      const selected = this.#optionsWrapper.querySelector('.selected') as HTMLDivElement
      const options = Array.from(this.#optionsWrapper.querySelectorAll('.option'))

      // Enter key
      if (event.key === 'Enter' && selected) {
        this.handleOptionClick(selected)
        return
      }

      // Arrow down key for the first time
      if (event.key === 'ArrowDown' && !selected) {
        options[0].classList.add('selected')
        return
      }

      const selectedIndex = options.findIndex(option => option.classList.contains('selected'))
      const nextIndex = selectedIndex + 1
      const prevIndex = selectedIndex - 1

      // Arrow down key
      if (event.key === 'ArrowDown' && selected && nextIndex < options.length) {
        options[selectedIndex]?.classList.remove('selected')
        options[nextIndex].classList.add('selected')
        return
      }

      // Arrow up key
      if (event.key === 'ArrowUp' && selected && prevIndex >= 0) {
        options[selectedIndex]?.classList.remove('selected')
        options[prevIndex].classList.add('selected')
      }

      // Home
      if (event.key === 'Home') {
        options[selectedIndex]?.classList.remove('selected')
        options[0].classList.add('selected')
      }

      // End
      if (event.key === 'End') {
        options[selectedIndex]?.classList.remove('selected')
        options[this.#array.length - 1].classList.add('selected')
      }
    }
  }

  handleArrowButtonClick (): void {
    this.toggleDropdown()
  }

  handleOptionClick (optionElement: HTMLDivElement): void {
    const value = optionElement.getAttribute('data-value')!

    this.#input.value = this.#array.find(option => option.value === value)!.name

    this.#input.setAttribute('data-value', value)
    this.toggleDropdown()

    this.handleInputChange()
  }

  connectedCallback (): void {
    if (this.id) {
      this.#input.id = this.id
    }

    const options = Array.from(this.querySelectorAll('ui-dropdown-option'))

    // Searchable
    if (this.isSearchable) {
      this.#input.addEventListener('input', () => this.handleInputChange())

      if (this.placeholder.length > 0) {
        this.#input.setAttribute('placeholder', this.placeholder)
      }
    } else {
      this.#input.setAttribute('readonly', '')
      this.#input.value = options[0].innerHTML
    }

    options.forEach(option => {
      this.#array.push({
        value: option.getAttribute('value')!,
        name: option.innerHTML,
        subtitle: option.getAttribute('subtitle') || ''
      })

      // Default selected
      if (option.hasAttribute('defaultselected')) {
        this.#input.value = option.innerHTML
      }

      this.removeChild(option)
    })

    this.renderDropdown()

    this.#input.addEventListener('click', () => this.handleInputClick())
    this.#input.addEventListener('keydown', event => this.handleInputKeyDown(event))
    this.#arrowButton.addEventListener('click', () => this.handleArrowButtonClick())
    this.#overlay.addEventListener('click', () => this.closeDropdown())
  }

  disconnectedCallback (): void {
    if (this.isSearchable) {
      this.#input.removeEventListener('input', () => this.handleInputChange())
    }
    this.#input.removeEventListener('click', () => this.handleInputClick())
    this.#input.removeEventListener('keydown', event => this.handleInputKeyDown(event))
    this.#arrowButton.removeEventListener('click', () => this.handleArrowButtonClick())
    this.#overlay.removeEventListener('click', () => this.closeDropdown())
  }

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
          console.warn('Unknown attribute:', attrName)
      }
    }
  }

  renderDropdown (): void {
    this.#optionsWrapper.textContent = ''

    let options = [...this.#array]

    if (this.isSearchable) {
      options = this.isSubtitleSearchable
        ? this.#array.filter(option => option.name.toLowerCase().includes(this.#input.value.toLowerCase()) || option.subtitle.toLowerCase().includes(this.#input.value.toLowerCase()))
        : this.#array.filter(option => option.name.toLowerCase().includes(this.#input.value.toLowerCase()))
    }

    if (options.length < 1 && this.hasAttribute('emptysearchtext')) {
      const emptyEl = emptySearchTemplate.content.cloneNode(true) as HTMLDivElement
      emptyEl.querySelector('.empty-search')!.innerHTML = this.emptysearchtext
      this.#optionsWrapper.append(emptyEl)
      return
    }

    options.forEach(({ value, name, subtitle }, i) => {
      const optionEl = optionTemplate.content.cloneNode(true) as HTMLDivElement

      const nameEl = optionEl.querySelector('.option')! as HTMLDivElement
      nameEl.id = `option_${i}`
      nameEl.innerHTML = name
      nameEl.setAttribute('data-value', value)

      nameEl.addEventListener('click', () => this.handleOptionClick(nameEl))

      if (this.#input.getAttribute('data-value') === value) {
        nameEl.setAttribute('aria-selected', 'true')
        nameEl.classList.add('selected')
      }

      if (subtitle && subtitle.length > 0) {
        const subTitleEl = subTitleTemplate.content.cloneNode(true) as HTMLDivElement
        const smallEl = subTitleEl.querySelector('small') as HTMLDivElement
        smallEl.innerHTML = subtitle
        nameEl.appendChild(smallEl)
      }

      this.#optionsWrapper.append(optionEl)
    })
  }

  closeDropdown () : void {
    this.#optionsWrapper.classList.remove('open')
    this.#arrowButton.classList.remove('open')
    this.#overlay.classList.remove('visible')
  }

  toggleDropdown (): void {
    this.#arrowButton.setAttribute('aria-expanded', this.#arrowButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true')
    this.#optionsWrapper.classList.toggle('open')
    this.#arrowButton.classList.toggle('open')
    this.#overlay.classList.toggle('visible')
  }

  addError (errorMessage: string): void {
    this.#input.classList.add('error')
    this.#input.setAttribute('aria-invalid', 'true')

    this.#shadowRoot.appendChild(fieldErrorTemplate.content.cloneNode(true))

    const error = this.#shadowRoot.querySelector('p')!
    error.innerText = errorMessage
  }

  removeError () {
    this.#input.classList.remove('error')
    this.#input.setAttribute('aria-invalid', 'false')

    const error = this.#shadowRoot.querySelector('p')!
    error && this.#shadowRoot.removeChild(error)
  }
}
