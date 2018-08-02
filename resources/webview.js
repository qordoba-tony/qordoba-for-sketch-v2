import pluginCall from 'sketch-module-web-view/client'
import Rollbar from 'rollbar';

let rollbar;

const _rollbarConfig = {
  accessToken: "ee1a00df09e140fca8f560d78aec5700",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
      environment: "development"
  }
};
rollbar = new Rollbar(_rollbarConfig);
rollbar.info('Rollbar initialized in webview.js file!');

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

document.getElementById('login-button').addEventListener('click', function () {
  // pluginCall('login', 'Logging in!!!!', 'ethan@qordoba.com', 'Qpassfrontend25');
  const userEmailInput = document.querySelector('#user-email-input');
  const userPasswordInput = document.querySelector('#user-password-input');
  const emailValue = userEmailInput.value;
  const passwordValue = userPasswordInput.value;
  pluginCall('login', `Logging in as ${emailValue}!!`, emailValue, passwordValue);
  // pluginCall('debugger', emailValue);
  // pluginCall('debugger', passwordValue);
  rollbar.info(`${emailValue} attempting to log in.`);
});

// document.getElementById('sign-up-button').addEventListener('click', () => {
// 	pluginCall('nativeLog', 'Signing up!');
// });

window.redirectToSignup = function (browserWindow) {
	browserWindow.loadURL('https://qordoba.com/sketch-professional');
}

// called from the plugin
window.setRandomNumber = function (randomNumber) {
  document.getElementById('answer').innerHTML = 'Random number from the plugin: ' + randomNumber;
}

window.logInfoToRollbar = function (user, message) {
  // pluginCall('debugger', message);
  // pluginCall('debugger', user);
  rollbar.info(`${user}: ${message}`);
}

window.logErrorToRollbar = function (user, message) {
  rollbar.error(`${user}: ${message}`);
}

