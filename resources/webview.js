import pluginCall from 'sketch-module-web-view/client'
import Rollbar from 'rollbar';

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

document.getElementById('login-button').addEventListener('click', function () {
  pluginCall('login', 'Logging in!!!!', 'ethan@qordoba.com', 'Qpassfrontend25');
});

// document.getElementById('sign-up-button').addEventListener('click', () => {
// 	pluginCall('nativeLog', 'Signing up!');
// });

window.redirectToSignup = function (browserWindow) {
	browserWindow.loadURL('https://qordoba.com/sketch-professional');
}

// called from the plugin
window.setRandomNumber = function (randomNumber) {
  document.getElementById('answer').innerHTML = 'Random number from the plugin: ' + randomNumber
}

// window.setWindowIntoState

window.instantiateRollbarHandler = function () {
	pluginCall('nativeLog', 'invoking instantiateRollbar!');

	const _rollbarConfig = {
      accessToken: "ee1a00df09e140fca8f560d78aec5700",
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
          environment: "development"
      }
    };
    const rollbar = new Rollbar(_rollbarConfig);

}

// window.handleLoginAPICall = function (username, password, axios) {
// 	pluginCall('nativeLog', 'NATIVE LOG/debugger/axios.../JSON.axiosResponse');
// 	pluginCall('debugger', axios);
// 	axios.get('https://app.qordoba.com/api/login', {username, password})
// 		.then((res) => {
// 			pluginCall('debugger', JSON.stringify(res));
// 		});
// }

