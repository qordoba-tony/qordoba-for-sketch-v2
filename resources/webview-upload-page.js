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

const testButton = document.querySelector('#test-button');
testButton.addEventListener('click', () => {
	pluginCall('testUpload');
});

const projectDropdown = document.querySelector('#selected-proj');
projectDropdown.addEventListener('click', (event) => {
	const eventTarget = event.target;
	pluginCall('debugger', JSON.stringify(eventTarget));
	console.log('test click log');
	const projectDropdownItems = document.querySelector('#project-dropdown-items');

	if (projectDropdownItems.classList.contains('hide')) {
		projectDropdownItems.classList.remove('hide');
	} else {
		projectDropdownItems.classList.add('hide');
	}
});

window.addOrganizations = function(orgName) {
	document.querySelector('#selected-org').innerText = orgName;
	pluginCall('debugger', orgName);
}

window.listProjects = function (projectsArray) {
	const parsedProjectsArray = JSON.parse(projectsArray);
	const projectDropdownItems = document.querySelector('#project-dropdown-items');
	parsedProjectsArray.forEach(proj => {
		const projName = proj.name;
		const node = document.createElement('DIV');
		const textNode = document.createTextNode(projName);
		node.appendChild(textNode);
		projectDropdownItems.appendChild(node);
		// pluginCall('debugger', JSON.stringify(proj));
		// pluginCall('debugger', projName);

	})
}

window.setTimeout(() => {
	pluginCall('addOrganizations')
	pluginCall('listProjects');
}, 3000)


