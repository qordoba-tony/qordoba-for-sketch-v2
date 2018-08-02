import pluginCall from 'sketch-module-web-view/client'
import Rollbar from 'rollbar';

let rollbar;

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

document.getElementById('logout-button').addEventListener('click', () => {
	pluginCall('logout');
	rollbar.info('Logging out!');
});

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
    rollbar = new Rollbar(_rollbarConfig);
    rollbar.info('Rollbar initialized in webview-logged-in.js file!');
}

