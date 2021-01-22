import { within } from '@testing-library/dom'
import { Button } from './button'

describe('Button', () => {
  let buttonEl

  beforeAll(() => {
    window.customElements.define('ui-button', Button)
    buttonEl = document.createElement('ui-button')
    buttonEl.innerHTML = 'My button'
    document.body.appendChild(buttonEl)
  })

  it('has correct defaults', () => {
    const { getByTestId } = within(buttonEl.shadowRoot)
    const button = getByTestId('button')

    expect(button.classList.contains('default')).toBeTruthy()
    expect(button.type).toBe('button')
  })

  it('has correct primary styling', () => {
    buttonEl.setAttribute('kind', 'primary')
    const { getByTestId } = within(buttonEl.shadowRoot)
    const button = getByTestId('button')

    expect(button.classList.contains('primary')).toBeTruthy()
  })

  it('disabled buttons have disabled attribute', () => {
    buttonEl.setAttribute('disabled', '')
    const { getByTestId } = within(buttonEl.shadowRoot)
    const button = getByTestId('button')

    expect(button.getAttribute('disabled')).toBe('')
  })
})
