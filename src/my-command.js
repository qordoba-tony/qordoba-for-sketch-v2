import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')

export default function(context) {

  const options = {
    identifier: 'unique.id',
    width: 600,
    height: 350,
    show: false
  }

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message(s)
    webContents.executeJavaScript(`setRandomNumber(${Math.random()})`)
  })

  webContents.on('debugger', s => {
    console.log('debugger', s);
  });

  browserWindow.loadURL(require('../resources/webview.html'))
}
