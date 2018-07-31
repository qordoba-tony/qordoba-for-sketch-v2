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
    setUserInfo: function(userInfo) {
        this.token = userInfo.token;
        sketch.Settings.setSettingForKey('token', userInfo.token);

        // this.userInfo = userInfo;
    },
    setRollbarIntoStateHandler: function(rollbar) {
    }
}

export default qordobaSDK;
