import { within } from '@testing-library/dom'
import { Checkbox, tagName } from './checkbox'

describe('Checkbox', () => {
  let checkboxEl
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, Checkbox)
    checkboxEl = document.createElement(tagName)
    document.body.appendChild(checkboxEl)
  })

  it('Show error message', () => {
    checkboxEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(checkboxEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
