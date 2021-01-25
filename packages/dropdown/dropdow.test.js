import { within, fireEvent } from '@testing-library/dom'
import { Dropdown, tagName } from './dropdown'

describe('Dropdown', () => {
  let dropdownEl
  let input
  let button
  let options
  let optionDefault
  let optionOne
  let optionTwo

  beforeAll(() => {
    window.customElements.define(tagName, Dropdown)
    dropdownEl = document.createElement(tagName)

    optionDefault = document.createElement('ui-dropdown-option')
    optionDefault.setAttribute('selected', '')
    optionDefault.setAttribute('value', '-1')
    optionDefault.innerHTML = 'Please choose'
    dropdownEl.appendChild(optionDefault)

    optionOne = document.createElement('ui-dropdown-option')
    optionOne.setAttribute('value', '123456789')
    optionOne.innerHTML = 'Option one'
    dropdownEl.appendChild(optionOne)

    optionTwo = document.createElement('ui-dropdown-option')
    optionTwo.setAttribute('value', '987654321')
    optionTwo.innerHTML = 'Option two'
    dropdownEl.appendChild(optionTwo)

    document.body.appendChild(dropdownEl)

    const { getByTestId } = within(dropdownEl.shadowRoot)
    input = getByTestId('input')
    button = getByTestId('button')
    options = getByTestId('options')
  })

  it('should show options when clicking the button or input', () => {
    expect(options.classList.contains('open')).toBeFalsy()
    fireEvent.click(button)
    expect(options.classList.contains('open')).toBeTruthy()
    fireEvent.click(button)
    expect(options.classList.contains('open')).toBeFalsy()
    fireEvent.click(input)
    expect(options.classList.contains('open')).toBeTruthy()
  })
})
