const getTemplate = (type: string): HTMLTemplateElement => {
  const template = document.createElement('template')
  let fontSize = '1'
  if (type === 'h1') fontSize = '3'
  if (type === 'h2') fontSize = '2.6'
  if (type === 'h3') fontSize = '2.2'
  if (type === 'h4') fontSize = '1.8'
  if (type === 'h5') fontSize = '1.4'
  if (type === 'h6') fontSize = '1'

  template.innerHTML = `
  <style>
    :host {
      all: initial;
      display: block;
    }
    .heading {
      font-family: var(--ui-font-regular);
      color: var(--ui-heading);
      margin: 0 0 1rem 0;
      font-size: ${fontSize}rem;
    }
  </style>
  <${type} class="heading"><slot></slot></${type}>`
  return template
}

class Heading extends HTMLElement {
  #shadowRoot: ShadowRoot

  constructor (type: string) {
    super()
    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(getTemplate(type).content.cloneNode(true))
  }
}

export const tagName1 = 'ui-heading1'
export class Heading1 extends Heading {
  constructor () {
    super('h1')
  }
}

export const tagName2 = 'ui-heading2'
export class Heading2 extends Heading {
  constructor () {
    super('h2')
  }
}

export const tagName3 = 'ui-heading3'
export class Heading3 extends Heading {
  constructor () {
    super('h3')
  }
}

export const tagName4 = 'ui-heading4'
export class Heading4 extends Heading {
  constructor () {
    super('h4')
  }
}

export const tagName5 = 'ui-heading5'
export class Heading5 extends Heading {
  constructor () {
    super('h5')
  }
}

export const tagName6 = 'ui-heading6'
export class Heading6 extends Heading {
  constructor () {
    super('h6')
  }
}
