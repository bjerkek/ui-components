// https://testing-library.com/docs/dom-testing-library/example-intro



// ======================================================
// import { Button } from './button'

// describe('Button', () => {
//   beforeEach(() => {
//     window.customElements.define('ui-button', Button)
//   })

//   it('test 1', () => {
//     const customElement = document.createElement('ui-button')

//     expect(customElement.shadowRoot.querySelector('button').innerHTML).toBe('My Custom Title')
//   })
// })
// ======================================================
// ======================================================
import { Button } from './button'

describe('Button', () => {
  let buttonEl
  let shadowRoot

  beforeEach(() => {
    window.customElements.define('ui-button', Button)
    buttonEl = document.createElement('ui-button')
    buttonEl.innerText = 'hei'
    shadowRoot = buttonEl.shadowRoot
    document.body.append(buttonEl)
  })

  it('kjhkjhkjh', () => {
    expect(shadowRoot.querySelector('button')).toBeTruthy()
  })

  it('test 2', () => {
    expect(shadowRoot.querySelector('button').innerHTML).toBe('My Custom Title')
  })
})
// ======================================================
// import Button from './button'

// const button = new Button()
// document.body.appendChild(button) // needed for running connectedCallback

// const buttonEl = button.shadowRoot.querySelector('button')

// it('displays Button', () => {
//   expect(buttonEl.innerHTML.trim()).toBe('It works')
// })

// import Button from './button'

// describe('Button integration tests', () => {
//   let element, shadowRoot

//   beforeEach(() => {
//     window.customElements.define('ui-button', Button)
//     element = document.createElement('ui-button')
//     shadowRoot = element.shadowRoot
//     document.body.append(element)
//   })

//   describe('init', () => {
//     it('should add a button tag', () => {
//       expect(shadowRoot.querySelector('button')).toBeTruthy()
//     })
//   })
// })
