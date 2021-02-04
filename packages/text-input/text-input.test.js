import { within, fireEvent } from '@testing-library/dom'
import { TextInput, tagName } from './text-input'

describe('Number input', () => {
  let textInputEl
  let input
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, TextInput)
    textInputEl = document.createElement(tagName)
    document.body.appendChild(textInputEl)

    const { getByTestId } = within(textInputEl.shadowRoot)
    input = getByTestId('textInput')
  })

  it('should allow whatever as input', () => {
    fireEvent.input(input, { target: { value: 'bacon123eggs¡@£$½¥{[]}±' } })
    expect(input.value).toBe('bacon123eggs¡@£$½¥{[]}±')
  })

  it('should set attribute', () => {
    textInputEl.setAttribute('data-aria-label', 'This is aria-label')
    expect(input.getAttribute('aria-label')).toBe('This is aria-label')

    textInputEl.setAttribute('data-aria-labelledby', 'This is aria-labelledby')
    expect(input.getAttribute('aria-labelledby')).toBe('This is aria-labelledby')

    textInputEl.setAttribute('data-placeholder', 'This is placeholder')
    expect(input.getAttribute('placeholder')).toBe('This is placeholder')

    textInputEl.setAttribute('data-autocomplete', 'This is autocomplete')
    expect(input.getAttribute('autocomplete')).toBe('This is autocomplete')

    textInputEl.setAttribute('data-maxlength', 'This is maxlength')
    expect(input.getAttribute('maxlength')).toBe('This is maxlength')

    textInputEl.setAttribute('data-minlength', 'This is minlength')
    expect(input.getAttribute('minlength')).toBe('This is minlength')

    textInputEl.setAttribute('data-readonly', 'true')
    expect(input.hasAttribute('readonly')).toBeTruthy()

    textInputEl.setAttribute('data-spellcheck', 'true')
    expect(input.hasAttribute('spellcheck')).toBeTruthy()
  })

  it('should show error message', () => {
    textInputEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(textInputEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
    expect(errorContainer.innerText).toBe('Something is wrong')
  })
})
