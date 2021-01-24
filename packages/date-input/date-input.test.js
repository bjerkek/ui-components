import { within, fireEvent } from '@testing-library/dom'
import { DateInput, tagName } from './date-input'

describe('Date input', () => {
  let dateInputEl
  let dayInput
  let monthInput
  let yearInput
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, DateInput)
    dateInputEl = document.createElement(tagName)
    document.body.appendChild(dateInputEl)

    const { getByTestId } = within(dateInputEl.shadowRoot)
    dayInput = getByTestId('dayInput')
    monthInput = getByTestId('monthInput')
    yearInput = getByTestId('yearInput')
  })

  it('It is never 32 days in a month', () => {
    fireEvent.input(dayInput, { target: { value: '32' } })
    expect(dayInput.value).toBe('3')
  })

  it('It is never 13 months in a year', () => {
    fireEvent.input(monthInput, { target: { value: '13' } })
    expect(monthInput.value).toBe('1')
  })

  it('For now a year consist of four numbers', () => {
    fireEvent.input(yearInput, { target: { value: '19977' } })
    expect(yearInput.value).toBe('1997')
  })

  it('Show error message', () => {
    dateInputEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(dateInputEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
