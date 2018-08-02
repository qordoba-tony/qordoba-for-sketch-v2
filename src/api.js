import Rollbar from 'rollbar';
import sketch from 'sketch';

const qordobaSDK = qordobaSDK || {};

qordobaSDK.common = {
    version: undefined,
    context: undefined,
    command: undefined,
    document: undefined,
    selection: undefined,
    pages: undefined,
    page: undefined,
    artboard: undefined,
    current: undefined,
    userInfo: undefined,
    token: false,
    testString: 'test',
    init: function() {
    },
    // setUserInfo: function(userInfo) {
    //     console.log('setUserInfo invoked!');
    //     const token = userInfo.token;
    //     const loggedUser = userInfo.loggedUser;
    //     const username = userInfo.loggedUser.name;
    //     const organizations = userInfo.loggedUser.organizations;

    //     sketch.Settings.setSettingForKey('loggedUser', loggedUser);
    //     sketch.Settings.setSettingForKey('organizations', organizations);
    //     sketch.Settings.setSettingForKey('token', userInfo.token);
    //     sketch.Settings.setSettingForKey('username', username);
    //     // fetchProjects();

    // },
    setRollbarIntoStateHandler: function(rollbar) {
    }
}

// function fetchProjects() {
//     console.log('fetchProjects invoked!');
//     const orgId = String(sketch.Settings.settingForKey('organizations')[0].id);
//     const token = sketch.Settings.settingForKey('token');
//     const fetchProjectsURL = `https://app.qordoba.com/api/organizations/3204/projects/by_type/7`;
//     console.log(fetchProjectsURL);
//     console.log('token', token);
//     fetch(fetchProjectsURL, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'User-Agent': 'sketch',
//             'X-AUTH-TOKEN': String(token)
//         }

//     })
//         .then(response => {
//             // const projects = response.projects;
//             console.log('projects', response.projects);
//             console.log('response', JSON.stringify(response));
//         })
//         .catch(error => {
//             console.log('fetchProjects failed', error);
//         })
// }

export default qordobaSDK;
