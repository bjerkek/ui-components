import { within, screen } from '@testing-library/dom'
import { RadioGroup, tagName } from './radio-group'

describe('Radio group', () => {
  let radioGroupEl
  let errorContainer

  beforeAll(() => {
    window.customElements.define(tagName, RadioGroup)
    radioGroupEl = document.createElement(tagName)

    // radioGroupEl.appendChild() = `
    //   <ui-radio-button value="one">Number one</ui-radio-button>
    //   <ui-radio-button value="two">Number two</ui-radio-button>
    //   <ui-radio-button value="three">Number three</ui-radio-button>
    // `
    document.body.appendChild(radioGroupEl)
  })

  // it('should render three inputs type radio', () => {
  //   console.log(radioGroupEl.shadowRoot.innerHTML)
  //   expect(screen.findByText('Number one')).toBeTruthy()
  // })

  it('should show error message', () => {
    radioGroupEl.setAttribute('errormessage', 'Something is wrong')
    const { getByTestId } = within(radioGroupEl.shadowRoot)
    errorContainer = getByTestId('errorContainer')
    expect(errorContainer).toBeTruthy()
  })
})
