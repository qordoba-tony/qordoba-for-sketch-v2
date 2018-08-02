import pluginCall from 'sketch-module-web-view/client';
import Rollbar from 'rollbar';

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

