import BrowserWindow from 'sketch-module-web-view'
import sketch from 'sketch';
const UI = require('sketch/ui')
console.log('loading upload-page.js!');

function fetchProjects() {
  console.log('fetchProjects invoked!');
  const orgId = String(sketch.Settings.settingForKey('organizations')[0].id);
  const token = sketch.Settings.settingForKey('token');
  const fetchProjectsURL = `https://app.qordoba.com/api/organizations/${orgId}/projects/by_type/7`;
  fetch(fetchProjectsURL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'sketch',
        'X-AUTH-TOKEN': token
    }
  })
    .then(response => {
      console.log('response', JSON.stringify(response));
      if (response.status === 200) {
        response.json()
          .then(data => {
            console.log('data', JSON.stringify(data));
            const projects = data.projects;
            console.log('projects', JSON.stringify(projects));
          })
      } else {
        console.log('fetchProjects failed');
      }
    })
}

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

  webContents.on('debugger', (s) => {
    console.log('debugger', s);
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message(s)
    webContents.executeJavaScript(`setRandomNumber(${Math.random()})`)
  });

  webContents.on('addOrganizations', () => {
    const orgName = sketch.Settings.settingForKey('organizations')[0].name;
    const parsedOrgName = String(orgName);
    webContents.executeJavaScript(`addOrganizations('${parsedOrgName}')`);
    fetchProjects();
  });

  browserWindow.loadURL(require('../resources/upload-page.html'))
}
