import { within } from '@testing-library/dom'
import { Button } from './button'

describe('Button', () => {
  let buttonEl
  let button

  beforeAll(() => {
    window.customElements.define('ui-button', Button)
    buttonEl = document.createElement('ui-button')
    buttonEl.innerHTML = 'My button'
    document.body.appendChild(buttonEl)

    const { getByTestId } = within(buttonEl.shadowRoot)
    button = getByTestId('button')
  })

  it('has correct defaults', () => {
    expect(button.classList.contains('default')).toBeTruthy()
    expect(button.type).toBe('button')
  })

  it('has correct primary styling', () => {
    buttonEl.setAttribute('kind', 'primary')
    expect(button.classList.contains('primary')).toBeTruthy()
  })

  it('disabled buttons have disabled attribute', () => {
    buttonEl.setAttribute('disabled', '')
    expect(button.disabled).toBeTruthy()
  })
})
