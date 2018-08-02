import BrowserWindow from 'sketch-module-web-view';
import fetch from 'sketch-polyfill-fetch';
import qordobaSDK from './api';
import Rollbar from 'rollbar';
import sketch from 'sketch';

const UI = require('sketch/ui');
console.log('loading authenticate.js');

function setUserInfo (userInfo) {
    console.log('setUserInfo invoked from authenticate.js!!!!!');
    const token = userInfo.token;
    const loggedUser = userInfo.loggedUser;
    const username = userInfo.loggedUser.name;
    const organizations = userInfo.loggedUser.organizations;

    sketch.Settings.setSettingForKey('loggedUser', loggedUser);
    sketch.Settings.setSettingForKey('organizations', organizations);
    sketch.Settings.setSettingForKey('token', userInfo.token);
    sketch.Settings.setSettingForKey('username', username);
    // fetchProjects();
  }

export default function(context) {
  
  const token = sketch.Settings.settingForKey('token');

  const options = {
    identifier: 'unique.id',
    width: 600,
    height: 350,
    show: false
  }

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
        console.log('res', JSON.stringify(res));
        if (res.status === 200) {
          res.json().then(data => {
            setUserInfo(data);
            const name = data.loggedUser.name;
            webContents.executeJavaScript(`logInfoToRollbar("${name}", "Login successful")`);
            browserWindow.close();
          });
        } else {
          webContents.executeJavaScript(`logErrorToRollbar("${username}", "Login unsuccessful")`);
        }
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

