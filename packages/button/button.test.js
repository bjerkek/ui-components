import { within } from '@testing-library/dom'
import { Button, tagName } from './button'

describe('Button', () => {
  let buttonEl
  let button

  beforeAll(() => {
    window.customElements.define(tagName, Button)
    buttonEl = document.createElement(tagName)
    buttonEl.innerHTML = 'My button'
    document.body.appendChild(buttonEl)

    const { getByTestId } = within(buttonEl.shadowRoot)
    button = getByTestId('button')
  })

  it('should have correct defaults', () => {
    expect(button.classList.contains('default')).toBeTruthy()
    expect(button.type).toBe('button')
  })

  it('should have correct primary styling', () => {
    buttonEl.setAttribute('kind', 'primary')
    expect(button.classList.contains('primary')).toBeTruthy()
  })

  it('should disable buttons when disabled attribute is set', () => {
    buttonEl.setAttribute('disabled', '')
    expect(button.disabled).toBeTruthy()
  })
})
