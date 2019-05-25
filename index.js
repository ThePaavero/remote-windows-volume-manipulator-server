const express = require('express')
const app = express()
const port = 4004

app.use(express.json())

app.post('/', (req, res) => {

  res.json({
    success: true
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
