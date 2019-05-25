const express = require('express')
const app = express()
const port = 4004
const exec = require('child_process').exec

/**
 * NOTE: This server script needs "SetVol.exe" to be located one directory above this one's.
 * @link https://rlatour.com/setvol/
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
  const exePath = '..\\.\\SetVol.exe'

  switch (type) {
    case 'setVolume':
    default:
      exec(`${exePath} ${value}`, (error) => {
        if (error !== null) {
          console.log('exec error: ' + error)
          // Bad. Return early and bail.
          return res.json({
            success: false,
            error: error.message,
          })
        }
        // Good. Send something useful back.
        const debugObject = {
          type,
          value
        }
        console.log(debugObject)
        res.json({
          success: true,
          debugObject
        })
      })
      break
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
