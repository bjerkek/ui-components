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

  it('Allow whatever', () => {
    fireEvent.input(input, { target: { value: 'bacon123eggs¡@£$½¥{[]}±' } })
    expect(input.value).toBe('bacon123eggs¡@£$½¥{[]}±')
  })

  it('Show error message', () => {
    textInputEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(textInputEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
