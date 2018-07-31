import BrowserWindow from 'sketch-module-web-view';
import fetch from 'sketch-polyfill-fetch';
import qordobaSDK from './api';
import Rollbar from 'rollbar';
import sketch from 'sketch';

const UI = require('sketch/ui');


export default function(context) {
  const token = sketch.Settings.settingForKey('token');

  const options = {
    identifier: 'unique.id',
    width: 600,
    height: 350,
    show: false
  }

  
  //   // this.rollbar = rollbar;
  //   console.log('ROLLBAR', rollbar);
  // console.log('test log', rollbar);

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    // UI.message('UI loadeddd!' + '...')
    webContents.executeJavaScript('instantiateRollbarHandler()');
  })

  // add a handler for a call from web content's javascript
  webContents.on('login', (s, username, password) => {
    UI.message(s);
    fetch('https://app.qordoba.com/api/login', {
      method: 'PUT',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'sketch'
      }
    })
     .then((res) => {
       res.json().then(data => {
        qordobaSDK.common.setUserInfo(data);
        browserWindow.close();
      });
     })
     .catch(error => {
      console.log('error', error);
     })
  });

  webContents.on('logout', () => {
    sketch.Settings.setSettingForKey('token', null);
    browserWindow.close();
  })

  webContents.on('debugger', s => {
    console.log('debugger', s);
  });

  webContents.on('setRollbarIntoState', rollbarInstance => {
    qordobaSDK.common.setRollbarIntoStateHandler(rollbarInstance);
  });

  webContents.on('nativeLog', s => {
    UI.message(s);
  });

  webContents.on('instantiateRollbar', () => {
    webContents.executeJavaScript('instantiateRollbarHandler()');
  })

  if (token) {
    browserWindow.loadURL(require('../resources/logged-in-user-view.html'));
  } else {
    browserWindow.loadURL(require('../resources/webview.html'))
  }
}

