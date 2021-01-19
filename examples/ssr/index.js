const express = require('express')
const Button = require('@ui-components/button')

const port = 3000
const app = express()

app.get('*', (req, res) => {
  const html = Button

  const body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>SSR Example</title>
      <link rel="stylesheet" href="/main.css" />
    </head>
    <body>
      <div id="root">${html}</div>
    </body>
    </html>
  `
  res.send(body)
})

app.listen(port, () => console.log(`http://localhost:${port}`))
