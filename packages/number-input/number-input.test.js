import { within, fireEvent } from '@testing-library/dom'
import { NumberInput, tagName } from './number-input'

describe('Number input', () => {
  let numberInputEl
  let input
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, NumberInput)
    numberInputEl = document.createElement(tagName)
    document.body.appendChild(numberInputEl)

    const { getByTestId } = within(numberInputEl.shadowRoot)
    input = getByTestId('numberInput')
  })

  it('Allow only numbers', () => {
    fireEvent.input(input, { target: { value: 'bacon123eggs¡@£$½¥{[]}±' } })
    expect(input.value).toBe('123')
  })

  it('Show error message', () => {
    numberInputEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(numberInputEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
