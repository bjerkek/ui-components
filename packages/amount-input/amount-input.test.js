import { within, fireEvent } from '@testing-library/dom'
import { AmountInput, tagName } from './amount-input'

describe('Amount input', () => {
  let amountInputEl
  let input
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, AmountInput)
    amountInputEl = document.createElement(tagName)
    amountInputEl.setAttribute('allowdecimals', '')
    document.body.appendChild(amountInputEl)

    const { getByTestId } = within(amountInputEl.shadowRoot)
    input = getByTestId('amountInput')
  })

  it('Removes leading zero', () => {
    fireEvent.input(input, { target: { value: '023' } })
    expect(input.value).toBe('23')
  })

  it('Allow only numbers, dots and commas (according to allowDecimals)', () => {
    fireEvent.input(input, { target: { value: 'bacon123eggs¡@£$½¥{[]}±' } })
    expect(input.value).toBe('123')
  })

  it('Remove leading dot and comma', () => {
    fireEvent.input(input, { target: { value: ',.123' } })
    expect(input.value).toBe('123')
  })

  // it('Allow only one seperator', () => {
  //   fireEvent.input(input, { target: { value: '123,12,33' } })
  //   expect(input.value).toBe('123,12')
  // })

  // it('Allow only 2 decimals', () => {
  //   fireEvent.input(input, { target: { value: '123,1233' } })
  //   expect(input.value).toBe('123,12')
  // })

  it('Thousand seperator', () => {
    fireEvent.input(input, { target: { value: '123456789' } })
    expect(input.value).toBe('123 456 789')
  })

  it('Show error message', () => {
    amountInputEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(amountInputEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
