import { within } from '@testing-library/dom'
import { Switch, tagName } from './switch'

describe('Switch', () => {
  let switchEl
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, Switch)
    switchEl = document.createElement(tagName)
    document.body.appendChild(switchEl)
  })

  it('should show error message', () => {
    switchEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(switchEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
