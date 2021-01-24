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

  it('should show error message', () => {
    textInputEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(textInputEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
