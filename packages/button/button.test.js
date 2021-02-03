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

  it('should set observed attributes', () => {
    buttonEl.setAttribute('kind', 'primary')
    expect(button.classList.contains('primary')).toBeTruthy()

    buttonEl.setAttribute('data-disabled', 'true')
    expect(button.disabled).toBeTruthy()
  })

  it('should show a timer after 750ms when setting the loading attribute and disable the button', () => {
    buttonEl.setAttribute('loading', 'true')
    setTimeout(() => {
      expect(button.querySelector('.loadingContainer')).toBeTruthy()
      expect(button.disabled).toBeTruthy()
    }, 751)
  })

  it('should disable buttons when disabled attribute is set', () => {
    buttonEl.setAttribute('disabled', '')
    expect(button.disabled).toBeTruthy()
  })
})
