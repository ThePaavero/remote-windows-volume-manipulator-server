const express = require('express')
const app = express()
const port = 4004
const exec = require('child_process').exec

/**
 * NOTE: This server script needs "SetVol.exe" to be located one directory above this one's.
 */

app.use(express.json())

app.post('/', (req, res) => {

  /*
  Example POST input:
    {
      "action": {
        "type": "setVolume",
        "value": 20
      }
    }
   */

  const type = req.body.action.type
  const value = req.body.action.value

  switch (type) {
    case 'setVolume':
      exec(`..\\.\\SetVol.exe ${value}`, (error) => {
        if (error !== null) {
          console.log('exec error: ' + error)
        }
      })
      break
  }

  res.json({
    success: true,
    debugObject: {
      type,
      value
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
