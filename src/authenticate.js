import BrowserWindow from 'sketch-module-web-view';
import fetch from 'sketch-polyfill-fetch';
import qordobaSDK from './api';
import Rollbar from 'rollbar';
import sketch from 'sketch';
import { loginWithUsernameAndPassword } from './qordoba-api';

const UI = require('sketch/ui');
console.log('loading authenticate.js');

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

  const webContents = browserWindow.webContents;

  // function fetchProjects() {
  //   console.log('fetchProjects invoked from authenticate.js!!!!');
  //   const orgId = String(sketch.Settings.settingForKey('organizations')[0].id);
  //   console.log('orgId', orgId);
  //   const token = sketch.Settings.settingForKey('token');
  //   const username = sketch.Settings.settingForKey('username');
  //   const fetchProjectsURL = `https://app.qordoba.com/api/organizations/${orgId}/projects/by_type/7`;
  //   fetch(fetchProjectsURL, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'User-Agent': 'sketch',
  //         'X-AUTH-TOKEN': token
  //     }
  //   })
  //     .then(response => {
  //       console.log('response', JSON.stringify(response));
  //       if (response.status === 200) {
  //         response.json()
  //           .then(data => {
  //             console.log('data', JSON.stringify(data));
  //             const projects = data.projects;
  //             console.log('projects', JSON.stringify(projects));
  //             console.log('projects.length', projects.length);
  //             webContents.executeJavaScript(`logInfoToRollbar("${username}", "Request to fetch projects from Qordoba successful.")`);
  //             setProjectsIntoState(projects);
  //           })
  //       } else {
  //         console.log('fetchProjects failed', username);
  //         response.json()
  //           .then(data => {
  //             console.log('data', data);
  //           });
  //         webContents.executeJavaScript(`logErrorToRollbar("${username}", "Request to fetch projects from Qordoba unsuccessful")`);
  //       }
  //     })
  //     // .catch(error => {
  //     //   console.log('fetchProjects catch statement', error);
  //     // })
  // }

  function setProjectsIntoState(projects) {
    console.log('setProjectsIntoState invoked!');
    sketch.Settings.setSettingForKey('projects', projects);
    projects.forEach(proj => {
      // console.log('proj', JSON.stringify(proj));
    });
  }

  function setUserInfo (userInfo) {
    console.log('setUserInfo invoked from authenticate.js!!!!!');
    const token = userInfo.token;
    const loggedUser = userInfo.loggedUser;
    const username = userInfo.loggedUser.name;
    const organizations = userInfo.loggedUser.organizations;
    sketch.Settings.setSettingForKey('loggedUser', loggedUser);
    sketch.Settings.setSettingForKey('token', userInfo.token);
    sketch.Settings.setSettingForKey('username', username);
    sketch.Settings.setSettingForKey('organizations', organizations);
    if (organizations.length === 0) {
      webContents.executeJavaScript(`logErrorToRollbar("${username}", "User is not assigned to any organizations. Cannot make request to fetch projects.")`);
      return;
    }
    fetchProjects();
  }

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    // UI.message('UI loaded!' + '...')
  })

  // add a handler for a call from web content's javascript
  webContents.on('login', (s, username, password) => {
    UI.message(s);
    // fetch('https://app.qordoba.com/api/login', {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     username: username,
    //     password: password
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'User-Agent': 'sketch'
    //   }
    // })
    //   .then((res) => {
    //     console.log('res', JSON.stringify(res));
    //     if (res.status === 200) {
    //       res.json().then(data => {
    //         const name = data.loggedUser.name;
    //         webContents.executeJavaScript(`logInfoToRollbar("${name}", "Login successful")`);
    //         browserWindow.close();
    //         setUserInfo(data);
    //       });
    //     } else {
    //       webContents.executeJavaScript(`logErrorToRollbar("${username}", "Login unsuccessful")`);
    //     }
    //   })
    loginWithUsernameAndPassword(username, password, context, browserWindow, webContents);
  });

  webContents.on('logout', () => {
    sketch.Settings.setSettingForKey('token', null);
    browserWindow.close();
  })

  webContents.on('debugger', s => {
    console.log('debugger', s);
  });

  webContents.on('nativeLog', s => {
    UI.message(s);
  });

  if (token) {
    browserWindow.loadURL(require('../resources/logged-in-user-view.html'));
  } else {
    browserWindow.loadURL(require('../resources/webview.html'))
  }
}

