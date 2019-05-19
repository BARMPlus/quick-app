
const express = require('express')

const app = express()

app.use(express.static('./dist'))

let port = 7071

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
