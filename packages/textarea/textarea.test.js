import { within, fireEvent } from '@testing-library/dom'
import { Textarea, tagName } from './textarea'

describe('Textarea', () => {
  let textareaEl
  let textarea
  let counter
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, Textarea)
    textareaEl = document.createElement(tagName)
    textareaEl.setAttribute('maxlength', '900')
    document.body.appendChild(textareaEl)

    const { getByTestId } = within(textareaEl.shadowRoot)
    textarea = getByTestId('textarea')
    counter = getByTestId('counter')
  })

  it('should show counter if maxlength is set', () => {
    expect(counter.innerHTML).toBe('900')
  })

  it('should count down when writing', () => {
    fireEvent.input(textarea, { target: { value: 'abc' } })
    expect(counter.innerHTML).toBe('897')
  })

  it('should show error message', () => {
    textareaEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(textareaEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
