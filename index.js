const express = require('express')
const exec = require('child_process').exec

const app = express()
const port = 4004

/**
 * Server script that executes a Windows application (see note below) with which one can manipulate Windows' audio volume.
 *
 * NOTE: This server script needs "SetVol.exe" to be located one directory above this one's.
 * @link https://rlatour.com/setvol/
 */

app.use(express.json())

const getTimeString = () => {
  const date = new Date()
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

app.post('/', (req, res) => {

  /*
  Example POST input:

  {
    "action": {
      "type": "SET_VOLUME",
      "payload": 20
    }
  }
  */

  const postBody = req.body
  const type = postBody.action.type
  const payload = postBody.action.payload
  const exePath = '..\\.\\SetVol.exe'

  switch (type) {
    case 'SET_VOLUME':
    default:
      exec(`${exePath} ${payload}`, (error) => {
        if (error !== null) {
          // Bad. Return early and bail.
          console.log(getTimeString(), 'Executing failed: ' + error)
          return res.json({
            success: false,
            error: error.message,
          })
        }
        // Good. Send something useful back.
        const debugObject = {
          type,
          payload
        }
        console.log(getTimeString(), debugObject)
        res.json({
          success: true,
          debugObject
        })
      })
      break
  }
})

app.listen(port, () => console.log(`Volume setting app is listening on port ${port}.`))
