import { within } from '@testing-library/dom'
import { RadioGroup, tagName } from './radio-group'

describe('Radio group', () => {
  let radioGroupEl
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, RadioGroup)
    radioGroupEl = document.createElement(tagName)
    document.body.appendChild(radioGroupEl)
  })

  it('should show error message', () => {
    radioGroupEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(radioGroupEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
