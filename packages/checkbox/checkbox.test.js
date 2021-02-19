import { within, fireEvent } from '@testing-library/dom'
import { Checkbox, tagName } from './checkbox'

describe('Checkbox', () => {
  let checkboxEl
  let input
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, Checkbox)
  })

  beforeEach(() => {
    checkboxEl = document.createElement(tagName)
    document.body.appendChild(checkboxEl)
    const { getByTestId } = within(checkboxEl.shadowRoot)
    input = getByTestId('checkbox')
  })

  it('should set observed attributes', () => {
    checkboxEl.setAttribute('data-aria-label', 'This is aria-label')
    expect(input.getAttribute('aria-label')).toBe('This is aria-label')

    checkboxEl.setAttribute('data-aria-labelledby', 'This is aria-labelledby')
    expect(input.getAttribute('aria-labelledby')).toBe('This is aria-labelledby')
  })

  it('should be checked/unchecked when clicked', () => {
    expect(input.checked).toBeFalsy()
    fireEvent.click(input)
    expect(input.checked).toBeTruthy()
  })

  // it('should check the checkbox when defaultchecked is set', () => {
  //   checkboxEl.setAttribute('defaultchecked', 'true').then()
  //   expect(input.checked).toBeTruthy()
  // })

  it('should show error message', () => {
    checkboxEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(checkboxEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
