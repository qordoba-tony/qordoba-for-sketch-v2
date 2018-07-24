import Rollbar from 'rollbar';

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
        console.log('qordobaSDK.common.init invoked!');
    },
    setUserInfo: function(userInfo) {
        console.log('setUserInfo invoked!', JSON.stringify(userInfo));
        this.token = userInfo.token;
        this.userInfo = userInfo;
        console.log('this', JSON.stringify(this));
    },
    setRollbarIntoStateHandler: function(rollbar) {
        console.log('setRollbarIntoStateHandler invoked', JSON.stringify(rollbar));
    }
}

export default qordobaSDK;