import pluginCall from 'sketch-module-web-view/client';
import Rollbar from 'rollbar';

const _rollbarConfig = {
  accessToken: "ee1a00df09e140fca8f560d78aec5700",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
      environment: "development"
  }
};
const rollbar = new Rollbar(_rollbarConfig);

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

window.addOrganizations = function(orgName) {
	document.querySelector('#selected-org').innerText = orgName;
	pluginCall('debugger', orgName);
}

window.setTimeout(() => {
	pluginCall('addOrganizations')
}, 3000)


