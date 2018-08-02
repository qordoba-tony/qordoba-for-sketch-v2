import pluginCall from 'sketch-module-web-view/client'
import Rollbar from 'rollbar';

// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

document.getElementById('logout-button').addEventListener('click', () => {
	pluginCall('logout');
});
