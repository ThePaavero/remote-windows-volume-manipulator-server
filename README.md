# Server script that executes a Windows application (see note below) with which one can manipulate Windows' audio volume. This is just a POC for fun.

### Installing
`git clone https://github.com/ThePaavero/remote-windows-volume-manipulator-server.git`
- Download the free application that does the actual manipulating from https://rlatour.com/setvol/
- Unzip it one directory above this application's directory (../)

`npm i`

### Starting the server
`node index.js`

### Usage
There is no "client" part for this yet. I've only used Postman to make sure it works.
