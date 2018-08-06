var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(6)
  var sketchDebugger = __webpack_require__(8)
  var actions = __webpack_require__(10)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function EventEmitter () {}

// By default, a maximum of 10 listeners can be registered for any single event.
EventEmitter.defaultMaxListeners = 10

// Shortcuts to improve speed and size
var proto = EventEmitter.prototype

proto._maxListeners = EventEmitter.defaultMaxListeners

function indexOfListener (listeners, listener) {
  var i = listeners.length
  while (i--) {
    if (listeners[i].listener === listener) {
      return i
    }
  }

  return -1
}

function alias (name) {
  return function aliasClosure () {
    return this[name].apply(this, arguments)
  }
}

function isValidListener (listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

proto._getListeners = function _getListeners (evt) {
  var events = this._getEvents()

  return events[evt] || (events[evt] = [])
}

proto._getEvents = function _getEvents () {
  return this._events || (this._events = {})
}

/*
  Alias for emitter.on(eventName, listener).
*/
proto.addListener = alias('on')

/*
  Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

  Returns true if the event had listeners, false otherwise.
*/
proto.emit = function emit (evt) {
  var args = Array.prototype.slice.call(arguments, 1)
  var listeners = this._getListeners(evt) || []
  var listener
  var i
  var key
  var response

  for (i = 0; i < listeners.length; i++) {
    listener = listeners[i]

    if (listener.once === true) {
      this.removeListener(evt, listener.listener)
    }

    response = listener.listener.apply(this, args || [])
  }

  return listeners.length > 0
}

/*
  Returns an array listing the events for which the emitter has registered listeners.
  The values in the array will be strings or Symbols.
*/
proto.eventNames = function eventNames () {
  var events = this._getEvents()
  return Object.keys(events)
}

/*
  Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
*/
proto.getMaxListeners = function getMaxListeners() {
  return this._maxListeners
}

/*
  Returns the number of listeners listening to the event named eventName.
*/
proto.listenerCount = function listenerCount(eventName) {
  return this._getListeners(eventName).length
}

/*
  Returns a copy of the array of listeners for the event named eventName.
*/
proto.listeners = function listeners(eventName) {
  return this._getListeners(eventName).map(function (wrappedListener) {
    return wrappedListener.listener
  })
}

/*
  Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.on = function on (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.push(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependOnceListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.once = function once (evt, listener) {
  return this.on(evt, {
    listener: listener,
    once: true
  })
}

/*
  Adds the listener function to the beginning of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependListener = function prependListener (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.unshift(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependOnceListener = function prependOnceListener (evt, listener) {
  return this.prependListener(evt, {
    listener: listener,
    once: true
  })
}

/*
  Removes all listeners, or those of the specified eventName.

  Note that it is bad practice to remove listeners added elsewhere in the code, particularly when the EventEmitter instance was created by some other component or module (e.g. sockets or file streams).

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeAllListeners = function removeAllListeners (evt) {
  var events = this._getEvents()

  if (typeof evt === 'string') {
    // Remove all listeners for the specified event
    delete events[evt]
  } else {
    // Remove all listeners in all events
    delete this._events
  }

  return this
}

/*
  Removes the specified listener from the listener array for the event named eventName.

  removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.

  Note that once an event has been emitted, all listeners attached to it at the time of emitting will be called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events will behave as expected.

  Because listeners are managed using an internal array, calling this will change the position indices of any listener registered after the listener being removed. This will not impact the order in which listeners are called, but it means that any copies of the listener array as returned by the emitter.listeners() method will need to be recreated.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeListener = function removeListener (evt, listener) {
  var listeners = this._getListeners(evt)

  var index = indexOfListener(listeners, listener)

  if (index !== -1) {
    listeners.splice(index, 1)

    this.emit('removeListener', evt, listener)
  }

  return this
}

/*
  By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.setMaxListeners = function setMaxListeners (n) {
  this._maxListeners = n
  return this
}

/*
  Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once).
*/
proto.rawListeners = function rawListeners (evt) {
  return this._getListeners(evt).slice()
}

module.exports = EventEmitter


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(14);

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (context) {

  var options = {
    identifier: 'unique.id',
    width: 600,
    height: 350,
    show: false
  };

  var browserWindow = new _sketchModuleWebView2['default'](options);

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });

  var webContents = browserWindow.webContents;

  // print a message when the page loads
  webContents.on('did-finish-load', function () {
    UI.message('UI loaded!');
  });

  webContents.on('debugger', function (s) {
    console.log('debugger', s);
  });

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', function (s) {
    UI.message(s);
    webContents.executeJavaScript('setRandomNumber(' + String(Math.random()) + ')');
  });

  webContents.on('addOrganizations', function () {
    var orgName = _sketch2['default'].Settings.settingForKey('organizations')[0].name;
    var parsedOrgName = String(orgName);
    webContents.executeJavaScript('addOrganizations(\'' + String(parsedOrgName) + '\')');
  });

  webContents.on('listProjects', function () {
    var projectsArray = _sketch2['default'].Settings.settingForKey('projects');
    // console.log('projectsArray', projectsArray);
    webContents.executeJavaScript('listProjects(\'' + String(JSON.stringify(projectsArray)) + '\')');
  });

  webContents.on('testUpload', function () {

    // const projectId = '53';
    // const orgId = '1';
    var org = _sketch2['default'].Settings.settingForKey('organizations')[0];
    var project = _sketch2['default'].Settings.settingForKey('projects')[0];
    console.log('testUpload handler invoked', JSON.stringify(org), JSON.stringify(project));
    _controller2['default'].uploadCurrentPage(org, project, context);
  });

  browserWindow.loadURL(__webpack_require__(11));
};

var _sketchModuleWebView = __webpack_require__(12);

var _sketchModuleWebView2 = _interopRequireDefault(_sketchModuleWebView);

var _sketch = __webpack_require__(20);

var _sketch2 = _interopRequireDefault(_sketch);

var _controller = __webpack_require__(21);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var UI = __webpack_require__(26);
// console.log('loading upload-page.js!', controller);

// function fetchProjects() {
//   console.log('fetchProjects invoked!');
//   const orgId = String(sketch.Settings.settingForKey('organizations')[0].id);
//   const token = sketch.Settings.settingForKey('token');
//   const fetchProjectsURL = `https://app.qordoba.com/api/organizations/${orgId}/projects/by_type/7`;
//   fetch(fetchProjectsURL, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': 'sketch',
//         'X-AUTH-TOKEN': token
//     }
//   })
//     .then(response => {
//       console.log('response', JSON.stringify(response));
//       if (response.status === 200) {
//         response.json()
//           .then(data => {
//             console.log('data', JSON.stringify(data));
//             const projects = data.projects;
//             console.log('projects', JSON.stringify(projects));
//           })
//       } else {
//         console.log('fetchProjects failed');
//       }
//     })
// }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(7)

module.exports.toArray = __webpack_require__(2)
module.exports.prepareStackTrace = __webpack_require__(1)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(1)
var toArray = __webpack_require__(2)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(9)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "file://" + context.plugin.urlForResourceNamed("_webpack_resources/476d9bbf6fb0c5684bbf7dd156f10d06.html").path();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(3)
var buildBrowserAPI = __webpack_require__(13)
var buildWebAPI = __webpack_require__(15)
var fitSubviewToView = __webpack_require__(18)
var dispatchFirstClick = __webpack_require__(19)

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  // Long-running script
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  // TODO: handle modal mode

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var webView = WebView.alloc().initWithFrame(
    NSMakeRect(0, 0, options.width || 800, options.height || 600)
  )
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  if (options.webPreferences) {
    // TODO:
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents.executeJavaScript(
          dispatchFirstClick(webView, event)
        )
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    if (fiber) {
      fiber.cleanup()
    } else {
      coscript.shouldKeepAround = false
    }
  })

  threadDictionary[identifier] = browserWindow

  if (fiber) {
    fiber.onCleanup(function() {
      if (!browserWindow._destroyed) {
        browserWindow.destroy()
      }
    })
  }

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    var browserWindow = threadDictionary[identifier]
    browserWindow.show()

    return browserWindow
  }

  return undefined
}

module.exports = BrowserWindow


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(4).default

var COLOR_CLASSES = [
  'NSColor',
  'NSCachedWhiteColor',
  'NSColorSpaceColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

// We create one ObjC class for ourselves here
var WindowDelegateClass

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    bounds.origin.x = x
    bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return [
      bounds.origin.x,
      Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
    ]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url = __command
          .pluginBundle()
          .urlForResourceNamed(url)
          .path()
      }
    }
    webview.setMainFrameURL(url)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setDrawsBackground(false)
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }

  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,

      // Tells the delegate that the window has been resized.
      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      // Tells the delegate that the window has been resized.
      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      // Tells the delegate that the window has been resized.
      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  var windowDelegate = WindowDelegateClass.new()
  windowDelegate.utils = NSDictionary.dictionaryWithDictionary({
    emit: browserWindow.emit.bind(browserWindow),
  })

  panel.setDelegate(windowDelegate)
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(4).default
var EventEmitter = __webpack_require__(3)
var parseWebArguments = __webpack_require__(16)
var CONSTANTS = __webpack_require__(17)

// We create one ObjC class for ourselves here
var FrameLoadDelegateClass

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL
  webContents.getURL = webview.mainFrameURL
  webContents.getTitle = webview.mainFrameTitle
  webContents.isDestroyed = function() {
    // TODO:
  }
  webContents.isLoading = function() {
    return webview.loading()
  }
  webContents.stop = webview.stopLoading
  webContents.reload = webview.reload
  webContents.canGoBack = webview.canGoBack
  webContents.canGoForward = webview.canGoForward
  webContents.goBack = webview.goBack
  webContents.goForward = webview.goForward
  webContents.executeJavaScript = function(script) {
    return webview.stringByEvaluatingJavaScriptFromString(script)
  }
  webContents.undo = function() {
    webview.undoManager().undo()
  }
  webContents.redo = function() {
    webview.undoManager().redo()
  }
  webContents.cut = webview.cut
  webContents.copy = webview.copy
  webContents.paste = webview.paste
  webContents.pasteAndMatchStyle = webview.pasteAsRichText
  webContents.delete = webview.delete
  webContents.replace = webview.replaceSelectionWithText
  webContents.getNativeWebview = function() {
    return webview
  }

  if (!FrameLoadDelegateClass) {
    FrameLoadDelegateClass = ObjCClass({
      classname: 'FrameLoadDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        lastQueryId: null,
        wasReady: 0,
      }),
      utils: null,

      // // Called when a client redirect is cancelled.
      // 'webView:didCancelClientRedirectForFrame:': function (
      //   webView,
      //   webFrame
      // ) {},

      // Called when the scroll position within a frame changes.
      'webView:didChangeLocationWithinPageForFrame:': function(webView) {
        this.utils.emitEvent('did-navigate-in-page', [
          {},
          webView
            .windowScriptObject()
            .evaluateWebScript('window.location.href'),
        ])
      },

      // // Called when the JavaScript window object in a frame is ready for loading.
      // 'webView:didClearWindowObject:forFrame:': function (
      //   webView,
      //   windowObject,
      //   webFrame
      // ) {},

      // // Called when content starts arriving for a page load.
      // 'webView:didCommitLoadforFrame:': function (webView, webFrame) {},

      // // Notifies the delegate that a new JavaScript context has been created.
      // N.B - we intentionally omit the 2nd parameter (javascriptContext)
      // It was causing crashes in Sketch - possibly because of issues with converting
      // it from Objective C to Javascript
      'webView:didCreateJavaScriptContext:forFrame:': function(webView) {
        // any time there is a new js context, set a global value (on window.) to refer
        // to this frameloaddelegate class
        webView.windowScriptObject().setValue_forKey_(this, CONSTANTS.JS_BRIDGE)
      },

      // the normal way to expose a selector to webscript is with 'isSelectorExcludedFromWebScript:'
      // but that didn't work, so this is an alternative. This method gets invoked any time
      // an unknown method is called on this class by webscript
      'invokeUndefinedMethodFromWebScript:withArguments:': function(
        method,
        webArguments
      ) {
        if (String(method) !== 'callNative') {
          return false
        }

        var args = this.utils.parseWebArguments(webArguments)
        if (!args) {
          return false
        }

        this.utils.emit.apply(this, args)
        return true
      },

      // Called when an error occurs loading a committed data source.
      'webView:didFailLoadWithError:forFrame:': function(_, error) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when a page load completes.
      'webView:didFinishLoadForFrame:': function() {
        if (this.state.wasReady == 0) {
          // eslint-disable-line
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
        this.utils.emit('dom-ready')
      },

      // Called when a provisional data source for a frame receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalLoadForFrame:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // Called when the page title of a frame loads or changes.
      'webView:didReceiveTitle:forFrame:': function(_, _title) {
        var title = String(_title)
        var shouldChangeTitle = true
        this.utils.emitBrowserEvent(
          'page-title-updated',
          {
            get defaultPrevented() {
              return !shouldChangeTitle
            },
            preventDefault: function() {
              shouldChangeTitle = false
            },
          },
          title
        )

        if (shouldChangeTitle && title) {
          this.utils.setTitle(title)
        }
      },

      // Called when a page load is in progress in a given frame.
      'webView:didStartProvisionalLoadForFrame:': function() {
        this.utils.emit('did-start-loading')
      },

      // Called when a frame will be closed.
      // 'webView:willCloseFrame:': function (webView, webFrame) {}

      // Called when a frame receives a client redirect and before it is fired.
      'webView:willPerformClientRedirectToURL:delay:fireDate:forFrame:': function(
        _,
        url
      ) {
        this.utils.emit('will-navigate', {}, String(url.absoluteString))
      },
    })
  }

  var frameLoadDelegate = FrameLoadDelegateClass.new()
  frameLoadDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent: browserWindow.emit.bind(browserWindow),
    emit: webContents.emit.bind(webContents),
    parseWebArguments: parseWebArguments,
  })
  // reset state as well
  frameLoadDelegate.state = NSMutableDictionary.dictionaryWithDictionary({
    lastQueryId: null,
    wasReady: 0,
  })

  webview.setFrameLoadDelegate(frameLoadDelegate)

  browserWindow.webContents = webContents
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
	value: true
});

var _qordobaEditor = __webpack_require__(22);

var _qordobaEditor2 = _interopRequireDefault(_qordobaEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

console.log('controller.js loaded!');

var controller = {
	translateCurrentPage: function () {
		function translateCurrentPage(organization, project, language, symbolOption, context) {
			var doc = context.document;
			if (!project || !language || !organization) {
				fireConfiguration(context);
				return;
			}
			var currentPage = doc.currentPage;

			var success = true;
			var errors = 0;
			if (utils.isGeneratedPage(currentPage, context)) {
				fireError("Warning!", "This Page is the translated version. To fetch an updated version of the translation, please pull from the original Page.");
				return;
			}
			var pageName = currentPage.name;
			var documentName = doc.displayName().replace(/.sketch$/, "");
			var translations = downloadFileByName(context, organization.id, project.id, language.id, documentName + " - " + pageName);
			if (translations) {
				errors = translate.translatePageWithData(context, currentPage, language, translations, symbolOption);
				if (errors > 0) {
					fireError("Success!", "Translated Pages created successfully. " + errors + " text layers could not be found.");
				} else {
					fireError("Success!", "Translated Pages created successfully.");
				}
				return;
			} else {
				fireError("Error!", "Couldn't load the translated content.");
				return;
			}
		}

		return translateCurrentPage;
	}(),
	uploadCurrentPage: function () {
		function uploadCurrentPage(organization, project, context) {
			// console.log('uploadCurrentPage invoked', organization, project, context);
			console.log("Upload current page for project: " + project.id);
			var editor = _qordobaEditor2['default'].editor.init(context);
			console.log('editor', editor);
			editor.upload(organization.id, project.id, context);
		}

		return uploadCurrentPage;
	}()
};

exports['default'] = controller;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
    value: true
});

var _MochaJSDelegate = __webpack_require__(23);

var _MochaJSDelegate2 = _interopRequireDefault(_MochaJSDelegate);

var _files = __webpack_require__(24);

var _files2 = _interopRequireDefault(_files);

var _utils = __webpack_require__(25);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

console.log('loading qordoba-editor.js');

var qordobaSDK = qordobaSDK || {};
// log("Start....");
var I18N = {},
    lang = "en-US",
    language = "";

function _(str, data) {
    var str = I18N[lang] && I18N[lang][str] ? I18N[lang][str] : str;

    var idx = -1;
    return str.replace(/\%\@/gi, function () {
        idx++;
        return data[idx];
    });
}

qordobaSDK.editor = {
    init: function () {
        function init(context) {
            this.extend(context);
            this.document = context.document;
            this.documentData = this.document.documentData();
            this.window = this.document.window();
            this.pages = this.document.pages();
            this.page = this.document.currentPage();
            this.artboard = this.page.currentArtboard();
            this.current = this.artboard || this.page;
            this.pluginRoot = this.scriptPath.stringByDeletingLastPathComponent().stringByDeletingLastPathComponent().stringByDeletingLastPathComponent();
            this.pluginSketch = this.pluginRoot + "/Contents/Sketch/helpers";

            if (NSFileManager.defaultManager().fileExistsAtPath(this.pluginSketch + "/i18n/" + lang + ".json")) {
                language = NSString.stringWithContentsOfFile_encoding_error(this.pluginSketch + "/i18n/" + lang + ".json", NSUTF8StringEncoding, nil);

                I18N[lang] = JSON.parse(language);
                language = "I18N[\'" + lang + "\'] = " + language;
            }

            this.symbolsPage = this.find({ key: "(name != NULL) && (name == %@)", match: "Symbols" }, this.document);
            this.symbolsPage = this.symbolsPage.count ? this.symbolsPage[0] : this.symbolsPage;
            if (!this.symbolsPage) {
                this.symbolsPage = this.document.addBlankPage();
                this.symbolsPage.setName("Symbols");
                this.document.setCurrentPage(this.page);
            }

            this.configs = this.getConfigs();
            return this;
        }

        return init;
    }(),
    extend: function () {
        function extend(options, target) {
            var target = target || this;

            for (var key in options) {
                target[key] = options[key];
            }
            return target;
        }

        return extend;
    }()
};

var BorderPositions = ["center", "inside", "outside"];
var FillTypes = ["color", "gradient"];
var GradientTypes = ["linear", "radial", "angular"];
var TextAligns = ["left", "right", "center", "justify", "left"];

qordobaSDK.editor.extend({
    regexNames: /OVERLAY\#|WIDTH\#|HEIGHT\#|TOP\#|RIGHT\#|BOTTOM\#|LEFT\#|VERTICAL\#|HORIZONTAL\#|NOTE\#|PROPERTY\#|LITE\#/,
    colors: {
        overlay: {
            layer: { r: 1, g: 0.333333, b: 0, a: 0.3 },
            text: { r: 1, g: 1, b: 1, a: 1 }
        },
        size: {
            layer: { r: 1, g: 0.333333, b: 0, a: 1 },
            text: { r: 1, g: 1, b: 1, a: 1 }
        },
        spacing: {
            layer: { r: 0.313725, g: 0.890196, b: 0.760784, a: 1 },
            text: { r: 1, g: 1, b: 1, a: 1 }
        },
        property: {
            layer: { r: 0.960784, g: 0.650980, b: 0.137255, a: 1 },
            text: { r: 1, g: 1, b: 1, a: 1 }
        },
        lite: {
            layer: { r: 0.564706, g: 0.074510, b: 0.996078, a: 1 },
            text: { r: 1, g: 1, b: 1, a: 1 }
        },
        note: {
            layer: { r: 1, g: 0.988235, b: 0.862745, a: 1 },
            border: { r: 0.8, g: 0.8, b: 0.8, a: 1 },
            text: { r: 0.333333, g: 0.333333, b: 0.333333, a: 1 }
        }
    }
});

// api.js
qordobaSDK.editor.extend({
    is: function () {
        function is(layer, theClass) {
            if (!layer) return false;
            var klass = layer['class']();
            return klass === theClass;
        }

        return is;
    }(),
    addGroup: function () {
        function addGroup() {
            return MSLayerGroup['new']();
        }

        return addGroup;
    }(),
    addShape: function () {
        function addShape() {
            var shape = MSRectangleShape.alloc().initWithFrame(NSMakeRect(0, 0, 100, 100));
            return MSShapeGroup.shapeWithPath(shape);
        }

        return addShape;
    }(),
    addText: function () {
        function addText(container) {
            var text = MSTextLayer['new']();
            text.setStringValue("text");
            return text;
        }

        return addText;
    }(),
    removeLayer: function () {
        function removeLayer(layer) {
            var container = layer.parentGroup();
            if (container) container.removeLayer(layer);
        }

        return removeLayer;
    }(),
    getRect: function () {
        function getRect(layer) {
            var rect = layer.absoluteRect();
            return {
                x: Math.round(rect.x()),
                y: Math.round(rect.y()),
                width: Math.round(rect.width()),
                height: Math.round(rect.height()),
                maxX: Math.round(rect.x() + rect.width()),
                maxY: Math.round(rect.y() + rect.height()),
                setX: function () {
                    function setX(x) {
                        rect.setX(x);this.x = x;this.maxX = this.x + this.width;
                    }

                    return setX;
                }(),
                setY: function () {
                    function setY(y) {
                        rect.setY(y);this.y = y;this.maxY = this.y + this.height;
                    }

                    return setY;
                }(),
                setWidth: function () {
                    function setWidth(width) {
                        rect.setWidth(width);this.width = width;this.maxX = this.x + this.width;
                    }

                    return setWidth;
                }(),
                setHeight: function () {
                    function setHeight(height) {
                        rect.setHeight(height);this.height = height;this.maxY = this.y + this.height;
                    }

                    return setHeight;
                }()
            };
        }

        return getRect;
    }(),
    toNopPath: function () {
        function toNopPath(str) {
            return this.toJSString(str).replace(/[\/\\\?]/g, " ");
        }

        return toNopPath;
    }(),
    toHTMLEncode: function () {
        function toHTMLEncode(str) {
            return this.toJSString(str).replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, '&gt;').replace(/\'/g, "&#39;").replace(/\"/g, "&quot;").replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
            // return str.replace(/\&/g, "&amp;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/\</g, "&lt;").replace(/\>/g, '&gt;');
        }

        return toHTMLEncode;
    }(),
    toSlug: function () {
        function toSlug(str) {
            return this.toJSString(str).toLowerCase().replace(/(<([^>]+)>)/ig, "").replace(/[\/\+\|]/g, " ").replace(new RegExp("[\\!@#$%^&\\*\\(\\)\\?=\\{\\}\\[\\]\\\\\\\,\\.\\:\\;\\']", "gi"), '').replace(/\s+/g, '-');
        }

        return toSlug;
    }(),
    toJSString: function () {
        function toJSString(str) {
            return new String(str).toString();
        }

        return toJSString;
    }(),
    toJSNumber: function () {
        function toJSNumber(str) {
            return Number(this.toJSString(str));
        }

        return toJSNumber;
    }(),
    pointToJSON: function () {
        function pointToJSON(point) {
            return {
                x: parseFloat(point.x),
                y: parseFloat(point.y)
            };
        }

        return pointToJSON;
    }(),
    rectToJSON: function () {
        function rectToJSON(rect, referenceRect) {
            if (referenceRect) {
                return {
                    x: Math.round(rect.x() - referenceRect.x()),
                    y: Math.round(rect.y() - referenceRect.y()),
                    width: Math.round(rect.width()),
                    height: Math.round(rect.height())
                };
            }

            return {
                x: Math.round(rect.x()),
                y: Math.round(rect.y()),
                width: Math.round(rect.width()),
                height: Math.round(rect.height())
            };
        }

        return rectToJSON;
    }(),
    colorToJSON: function () {
        function colorToJSON(color) {
            return {
                r: Math.round(color.red() * 255),
                g: Math.round(color.green() * 255),
                b: Math.round(color.blue() * 255),
                a: color.alpha(),
                "color-hex": color.immutableModelObject().stringValueWithAlpha(false) + " " + Math.round(color.alpha() * 100) + "%",
                "argb-hex": "#" + this.toHex(color.alpha() * 255) + color.immutableModelObject().stringValueWithAlpha(false).replace("#", ""),
                "css-rgba": "rgba(" + [Math.round(color.red() * 255), Math.round(color.green() * 255), Math.round(color.blue() * 255), Math.round(color.alpha() * 100) / 100].join(",") + ")",
                "ui-color": "(" + ["r:" + (Math.round(color.red() * 100) / 100).toFixed(2), "g:" + (Math.round(color.green() * 100) / 100).toFixed(2), "b:" + (Math.round(color.blue() * 100) / 100).toFixed(2), "a:" + (Math.round(color.alpha() * 100) / 100).toFixed(2)].join(" ") + ")"
            };
        }

        return colorToJSON;
    }(),
    colorStopToJSON: function () {
        function colorStopToJSON(colorStop) {
            return {
                color: this.colorToJSON(colorStop.color()),
                position: colorStop.position()
            };
        }

        return colorStopToJSON;
    }(),
    gradientToJSON: function () {
        function gradientToJSON(gradient) {
            var stopsData = [],
                stop,
                stopIter = gradient.stops().objectEnumerator();
            while (stop = stopIter.nextObject()) {
                stopsData.push(this.colorStopToJSON(stop));
            }

            return {
                type: GradientTypes[gradient.gradientType()],
                from: this.pointToJSON(gradient.from()),
                to: this.pointToJSON(gradient.to()),
                colorStops: stopsData
            };
        }

        return gradientToJSON;
    }(),
    shadowToJSON: function () {
        function shadowToJSON(shadow) {
            return {
                type: shadow instanceof MSStyleShadow ? "outer" : "inner",
                offsetX: shadow.offsetX(),
                offsetY: shadow.offsetY(),
                blurRadius: shadow.blurRadius(),
                spread: shadow.spread(),
                color: this.colorToJSON(shadow.color())
            };
        }

        return shadowToJSON;
    }(),
    getRadius: function () {
        function getRadius(layer) {
            return layer.layers && this.is(layer.layers().firstObject(), MSRectangleShape) ? layer.layers().firstObject().fixedRadius() : 0;
        }

        return getRadius;
    }(),
    getBorders: function () {
        function getBorders(style) {
            var bordersData = [],
                border,
                borderIter = style.borders().objectEnumerator();
            while (border = borderIter.nextObject()) {
                if (border.isEnabled()) {
                    var fillType = FillTypes[border.fillType()],
                        borderData = {
                        fillType: fillType,
                        position: BorderPositions[border.position()],
                        thickness: border.thickness()
                    };

                    switch (fillType) {
                        case "color":
                            borderData.color = this.colorToJSON(border.color());
                            break;

                        case "gradient":
                            borderData.gradient = this.gradientToJSON(border.gradient());
                            break;

                        default:
                            continue;
                    }

                    bordersData.push(borderData);
                }
            }

            return bordersData;
        }

        return getBorders;
    }(),
    getFills: function () {
        function getFills(style) {
            var fillsData = [],
                fill,
                fillIter = style.fills().objectEnumerator();
            while (fill = fillIter.nextObject()) {
                if (fill.isEnabled()) {
                    var fillType = FillTypes[fill.fillType()],
                        fillData = {
                        fillType: fillType
                    };

                    switch (fillType) {
                        case "color":
                            fillData.color = this.colorToJSON(fill.color());
                            break;

                        case "gradient":
                            fillData.gradient = this.gradientToJSON(fill.gradient());
                            break;

                        default:
                            continue;
                    }

                    fillsData.push(fillData);
                }
            }

            return fillsData;
        }

        return getFills;
    }(),
    getShadows: function () {
        function getShadows(style) {
            var shadowsData = [],
                shadow,
                shadowIter = style.shadows().objectEnumerator();
            while (shadow = shadowIter.nextObject()) {
                if (shadow.isEnabled()) {
                    shadowsData.push(this.shadowToJSON(shadow));
                }
            }

            shadowIter = style.innerShadows().objectEnumerator();
            while (shadow = shadowIter.nextObject()) {
                if (shadow.isEnabled()) {
                    shadowsData.push(this.shadowToJSON(shadow));
                }
            }

            return shadowsData;
        }

        return getShadows;
    }(),
    getOpacity: function () {
        function getOpacity(style) {
            return style.contextSettings().opacity();
        }

        return getOpacity;
    }(),
    getStyleName: function () {
        function getStyleName(layer) {
            var styles = this.is(layer, MSTextLayer) ? this.document.documentData().layerTextStyles() : this.document.documentData().layerStyles(),
                layerStyle = layer.style(),
                sharedObjectID = layerStyle.sharedObjectID(),
                style;

            styles = styles.objectsSortedByName();

            if (styles.count() > 0) {
                style = this.find({ key: "(objectID != NULL) && (objectID == %@)", match: sharedObjectID }, styles);
            }

            if (!style) return "";
            return this.toJSString(style.name());
        }

        return getStyleName;
    }()
});

// help.js
qordobaSDK.editor.extend({
    toHex: function () {
        function toHex(c) {
            var hex = Math.round(c).toString(16).toUpperCase();
            return hex.length == 1 ? "0" + hex : hex;
        }

        return toHex;
    }(),
    isIntersect: function () {
        function isIntersect(targetRect, layerRect) {
            return !(targetRect.maxX <= layerRect.x || targetRect.x >= layerRect.maxX || targetRect.y >= layerRect.maxY || targetRect.maxY <= layerRect.y);
        }

        return isIntersect;
    }(),
    getDistance: function () {
        function getDistance(targetRect, containerRect) {
            var containerRect = containerRect || this.getRect(this.current);

            return {
                top: targetRect.y - containerRect.y,
                right: containerRect.maxX - targetRect.maxX,
                bottom: containerRect.maxY - targetRect.maxY,
                left: targetRect.x - containerRect.x
            };
        }

        return getDistance;
    }(),
    message: function () {
        function message(_message) {
            this.document.showMessage(_message);
        }

        return message;
    }(),
    find: function () {
        function find(format, container, returnArray) {
            if (!format || !format.key || !format.match) {
                return false;
            }
            var predicate = NSPredicate.predicateWithFormat(format.key, format.match),
                container = container || this.current,
                items;

            if (container['class'] && container['class']() == __NSArrayI) {
                items = container;
            } else if (container.pages) {
                items = container.pages();
            } else if (this.is(container, MSSharedStyleContainer) || this.is(container, MSSharedTextStyleContainer)) {
                items = container.objectsSortedByName();
            } else if (container.children) {
                items = container.children();
            } else {
                items = container;
            }

            var queryResult = items.filteredArrayUsingPredicate(predicate);

            if (returnArray) return queryResult;

            if (queryResult.count() == 1) {
                return queryResult[0];
            } else if (queryResult.count() > 0) {
                return queryResult;
            } else {
                return false;
            }
        }

        return find;
    }()
});

// configs.js
qordobaSDK.editor.extend({
    getConfigs: function () {
        function getConfigs(container) {
            return JSON.parse('{"colorFormat": "argb-hex", "exportOption": "1","scale": "0.5","timestamp": 1471251211802,"unit": "pt"}');
        }

        return getConfigs;
    }()
});

// Panel.js
qordobaSDK.editor.extend({
    WebPanel: function () {
        function WebPanel(options) {
            var self = this,
                options = this.extend(options, {
                url: this.pluginSketch + "/panel/processing.html",
                width: 240,
                height: 316,
                state: 1,
                floatWindow: false,
                data: {
                    density: 2,
                    unit: "dp/sp"
                },
                titleBgColor: {
                    r: 0.305,
                    g: 0.294,
                    b: 0.450,
                    a: 1
                },
                contentBgColor: {
                    r: 0.305,
                    g: 0.294,
                    b: 0.450,
                    a: 1
                },
                hideClostButton: true,
                callback: function () {
                    function callback(data) {
                        return data;
                    }

                    return callback;
                }()
            }),
                result = false;
            options.url = encodeURI("file://" + options.url);

            COScript.currentCOScript().setShouldKeepAround_(true);

            var frame = NSMakeRect(0, 0, options.width, options.height + 32),

            //titleBgColor = NSColor.colorWithRed_green_blue_alpha(0.1, 0.1, 0.1, 1),
            //titleBgColor = NSColor.colorWithRed_green_blue_alpha(0.92,0.92,0.92,1),
            titleBgColor = NSColor.colorWithRed_green_blue_alpha(options.titleBgColor.r, options.titleBgColor.g, options.titleBgColor.b, options.titleBgColor.a),
                contentBgColor = NSColor.colorWithRed_green_blue_alpha(options.contentBgColor.r, options.contentBgColor.g, options.contentBgColor.b, options.contentBgColor.a);
            //contentBgColor = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1);
            //contentBgColor = NSColor.colorWithRed_green_blue_alpha(0.13, 0.13, 0.13, 1);

            var Panel = NSPanel.alloc().init();

            Panel.setTitlebarAppearsTransparent(true);
            Panel.standardWindowButton(NSWindowCloseButton).setHidden(options.hideClostButton);
            Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
            Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
            Panel.setFrame_display(frame, false);
            Panel.setBackgroundColor(contentBgColor);

            var contentView = Panel.contentView(),
                webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, options.width, options.height)),
                windowObject = webView.windowScriptObject(),
                delegate = new _MochaJSDelegate2['default']({
                "webView:didFinishLoadForFrame:": function () {
                    function webViewDidFinishLoadForFrame(webView, webFrame) {
                        var WebAction = ["function WebAction(data){", "window.SMData = encodeURI(JSON.stringify(data));", "window.location.hash = 'submit';",
                        // "console.log(SMData)",
                        "}", "function SMImportAction(data){", "window.location.hash = 'import';",
                        // "console.log(SMData)",
                        "}"].join(""),
                            DOMReady = ["$(", "function(){", "init(" + JSON.stringify(options.data) + ")", "}", ");"].join("");

                        windowObject.evaluateWebScript(WebAction);
                        windowObject.evaluateWebScript(language);
                        windowObject.evaluateWebScript(DOMReady);
                        COScript.currentCOScript().setShouldKeepAround_(false);
                    }

                    return webViewDidFinishLoadForFrame;
                }(),
                "webView:didChangeLocationWithinPageForFrame:": function () {
                    function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
                        var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

                        if (options.state) {
                            Panel.orderOut(nil);
                            NSApp.stopModal();
                            if (request == "submit") {
                                var data = JSON.parse(decodeURI(windowObject.valueForKey("SMData")));
                                options.callback(data);
                                result = true;
                            }
                        } else if (request == "import") {
                            if (options.importCallback(Panel, NSApp)) {
                                self.message(_("Import complete!"));
                            } else {
                                windowObject.evaluateWebScript("window.location.hash = '';");
                            }
                        } else if (request == "complete") {}
                        COScript.currentCOScript().setShouldKeepAround_(false);
                    }

                    return webViewDidChangeLocationWithinPageForFrame;
                }()
            });

            contentView.setWantsLayer(true);
            contentView.layer().setFrame(contentView.frame());
            contentView.layer().setCornerRadius(6);
            contentView.layer().setMasksToBounds(true);

            webView.setBackgroundColor(contentBgColor);
            webView.setFrameLoadDelegate_(delegate.getClassInstance());
            webView.setMainFrameURL_(options.url);

            contentView.addSubview(webView);

            var closeButton = Panel.standardWindowButton(NSWindowCloseButton);
            closeButton.setCOSJSTargetFunction(function (sender) {
                var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();
                if (options.state == 0 && request == "submit") {
                    data = JSON.parse(decodeURI(windowObject.valueForKey("SMData")));
                    options.callback(data);
                }
                self.wantsStop = true;
                Panel.orderOut(nil);
                NSApp.stopModal();
            });
            closeButton.setAction("callAction:");

            var titlebarView = contentView.superview().titlebarViewController().view(),
                titlebarContainerView = titlebarView.superview();
            closeButton.setFrameOrigin(NSMakePoint(8, 8));
            titlebarContainerView.setFrame(NSMakeRect(0, options.height, options.width, 32));
            titlebarView.setFrameSize(NSMakeSize(options.width, 32));
            titlebarView.setTransparent(true);
            titlebarView.setBackgroundColor(titleBgColor);
            titlebarContainerView.superview().setBackgroundColor(titleBgColor);

            if (options.floatWindow) {
                Panel.becomeKeyWindow();
                Panel.setLevel(NSFloatingWindowLevel);
                Panel.center();
                Panel.orderFront(NSApp.mainWindow());
                return webView;
            } else {
                NSApp.runModalForWindow(Panel);
            }

            return result;
        }

        return WebPanel;
    }()
});

// export.js
qordobaSDK.editor.extend({
    slices: [],
    sliceCache: {},
    maskCache: [],
    hasExportSizes: function () {
        function hasExportSizes(layer) {
            return layer.exportOptions().exportFormats().count() > 0;
        }

        return hasExportSizes;
    }(),
    isSliceGroup: function () {
        function isSliceGroup(layer) {
            return this.is(layer, MSLayerGroup) && this.hasExportSizes(layer);
        }

        return isSliceGroup;
    }(),
    isExportable: function () {
        function isExportable(layer) {
            return this.is(layer, MSTextLayer) || this.is(layer, MSShapeGroup) || this.is(layer, MSBitmapLayer) || this.is(layer, MSSliceLayer) || this.is(layer, MSSymbolInstance) || this.isSliceGroup(layer);
        }

        return isExportable;
    }(),
    getStates: function () {
        function getStates(layer) {
            var isVisible = true,
                isLocked = false,
                hasSlice = false,
                isEmpty = false,
                isMaskChildLayer = false,
                isMeasure = false;

            while (!(this.is(layer, MSArtboardGroup) || this.is(layer, MSSymbolMaster))) {
                var group = layer.parentGroup();

                if (this.regexNames.exec(group.name())) {
                    isMeasure = true;
                }

                if (!layer.isVisible()) {
                    isVisible = false;
                }

                if (layer.isLocked()) {
                    isLocked = true;
                }

                if (this.is(group, MSLayerGroup) && this.hasExportSizes(group)) {
                    hasSlice = true;
                }

                if (this.maskObjectID && group.objectID() == this.maskObjectID && !layer.shouldBreakMaskChain()) {
                    isMaskChildLayer = true;
                }

                if (this.is(layer, MSTextLayer) && layer.isEmpty()) {
                    isEmpty = true;
                }

                layer = group;
            }
            return {
                isVisible: isVisible,
                isLocked: isLocked,
                hasSlice: hasSlice,
                isMaskChildLayer: isMaskChildLayer,
                isMeasure: isMeasure,
                isEmpty: isEmpty
            };
        }

        return getStates;
    }(),
    checkMask: function () {
        function checkMask(group, layer, layerData, layerStates) {
            if (layer.hasClippingMask()) {
                if (layerStates.isMaskChildLayer) {
                    this.maskCache.push({
                        objectID: this.maskObjectID,
                        rect: this.maskRect
                    });
                }
                this.maskObjectID = group.objectID();
                this.maskRect = layerData.rect;
            } else if (!layerStates.isMaskChildLayer && this.maskCache.length > 0) {
                var mask = this.maskCache.pop();
                this.maskObjectID = mask.objectID;
                this.maskRect = mask.rect;
                layerStates.isMaskChildLayer = true;
            } else if (!layerStates.isMaskChildLayer) {
                this.maskObjectID = undefined;
                this.maskRect = undefined;
            }

            if (layerStates.isMaskChildLayer) {
                var layerRect = layerData.rect,
                    maskRect = this.maskRect;

                layerRect.maxX = layerRect.x + layerRect.width;
                layerRect.maxY = layerRect.y + layerRect.height;
                maskRect.maxX = maskRect.x + maskRect.width;
                maskRect.maxY = maskRect.y + maskRect.height;

                var distance = this.getDistance(layerRect, maskRect),
                    width = layerRect.width,
                    height = layerRect.height;

                if (distance.left < 0) width += distance.left;
                if (distance.right < 0) width += distance.right;
                if (distance.top < 0) height += distance.top;
                if (distance.bottom < 0) height += distance.bottom;

                layerData.rect = {
                    x: distance.left < 0 ? maskRect.x : layerRect.x,
                    y: distance.top < 0 ? maskRect.y : layerRect.y,
                    width: width,
                    height: height
                };
            }
        }

        return checkMask;
    }(),
    getExportable: function () {
        function getExportable(layer, savePath) {
            var self = this,
                exportable = [],
                size,
                sizes = layer.exportOptions().exportFormats(),
                sizesInter = sizes.objectEnumerator();

            var androidDensity = {
                "@0.75x": "ldpi",
                "@1x": "mdpi",
                "@1.5x": "hdpi",
                "@2x": "xhdpi",
                "@3x": "xxhdpi",
                "@4x": "xxxhdpi"
            };

            while (size = sizesInter.nextObject()) {

                var size = this.toJSString(size).split(" "),
                    scale = self.toJSNumber(size[0]),
                    format = size[2],
                    suffix = this.toJSString(size[1]),
                    suffix = suffix || "",
                    density = suffix,
                    drawablePath = "";

                if (sizes.count() == 1 && self.configs.scale != 1 && !density) {
                    suffix = "@" + self.configs.scale + "x";
                    density = suffix;
                }

                if (sizes.count() == 1 && scale == 1 && self.configs.scale == 1 && !density || sizes.count() > 1 && !density) {
                    density = "@1x";
                }

                // Android
                if (self.configs.unit == "dp/sp") {
                    drawablePath = "drawable-" + androidDensity[density] + "/";
                    density = androidDensity[density];
                    suffix = "";
                }

                this.exportImage({
                    layer: layer,
                    path: self.assetsPath,
                    scale: scale,
                    name: drawablePath + layer.name(),
                    suffix: suffix,
                    format: format
                });

                exportable.push({
                    name: self.toJSString(layer.name()),
                    density: density,
                    format: format,
                    path: drawablePath + layer.name() + suffix + "." + format
                });
            }

            return exportable;
        }

        return getExportable;
    }(),
    checkSlice: function () {
        function checkSlice(layer, layerData, symbolLayer) {
            var objectID = layerData.type == "symbol" ? this.toJSString(layer.symbolMaster().objectID()) : symbolLayer ? this.toJSString(symbolLayer.objectID()) : layerData.objectID;
            if ((layerData.type == "slice" || layerData.type == "symbol" && this.hasExportSizes(layer.symbolMaster())) && !this.sliceCache[objectID]) {
                var sliceLayer = layerData.type == "symbol" ? layer.symbolMaster() : layer;
                if (symbolLayer && this.is(symbolLayer.parentGroup(), MSSymbolMaster)) {
                    layer.exportOptions().setLayerOptions(2);
                }

                this.assetsPath = this.savePath + "/assets";
                NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(this.assetsPath, true, nil, nil);

                this.sliceCache[objectID] = layerData.exportable = this.getExportable(sliceLayer);
                this.slices.push({
                    name: layerData.name,
                    objectID: objectID,
                    rect: layerData.rect,
                    exportable: layerData.exportable
                });
            } else if (this.sliceCache[objectID]) {
                layerData.exportable = this.sliceCache[objectID];
            }
        }

        return checkSlice;
    }(),
    checkSymbol: function () {
        function checkSymbol(artboard, layer, layerData, data) {
            if (layerData.type == "symbol") {
                var self = this,
                    symbolObjectID = this.toJSString(layer.symbolMaster().objectID());

                layerData.objectID = symbolObjectID;

                if (!self.hasExportSizes(layer.symbolMaster()) && layer.symbolMaster().children().count() > 1) {
                    var symbolRect = this.getRect(layer),
                        symbolChildren = layer.symbolMaster().children(),
                        tempSymbol = layer.duplicate(),
                        tempGroup = tempSymbol.detachByReplacingWithGroup(),
                        tempGroupRect = this.getRect(tempGroup),
                        tempSymbolLayers = tempGroup.children().objectEnumerator(),
                        idx = 0;

                    var tempArtboard = this.addShape();
                    tempGroup.addLayers([tempArtboard]);
                    var tempArtboardRect = this.getRect(tempArtboard),
                        symbolMasterFrame = layer.symbolMaster().frame();

                    tempArtboardRect.setX(symbolRect.x);
                    tempArtboardRect.setY(symbolRect.y);
                    tempArtboardRect.setWidth(symbolMasterFrame.width());
                    tempArtboardRect.setHeight(symbolMasterFrame.height());

                    tempGroup.resizeToFitChildrenWithOption(0);
                    tempGroupRect.setX(symbolRect.x);
                    tempGroupRect.setY(symbolRect.y);
                    tempGroupRect.setWidth(symbolRect.width);
                    tempGroupRect.setHeight(symbolRect.height);
                    this.removeLayer(tempArtboard);

                    while (tempSymbolLayer = tempSymbolLayers.nextObject()) {
                        self.getLayer(artboard, tempSymbolLayer, data, symbolChildren[idx]);
                        idx++;
                    }
                    this.removeLayer(tempGroup);
                }
            }
        }

        return checkSymbol;
    }(),
    upload: function () {
        function upload(organizationID, projectID, context) {
            console.log('upload invoked in qordoba-editor.js!');
            var self = this,
                savePath = NSTemporaryDirectory();
            // log("Saving the reference at: " + savePath);

            var hasArtboards = self.page.artboards().count() > 0;
            console.log('hasArtboards', hasArtboards);

            this.selectionArtboards = this.page.artboards();
            console.log('this.selectionArtboards', this.selectionArtboards);
            console.log('this.pluginSketch', this.pluginSketch);
            //self.message(_("Exporting..."));
            // var processingPanel = this.WebPanel({
            //         url: this.pluginSketch + "/panel/processing.html",
            //         width: 350,
            //         height: 70,
            //         floatWindow: true
            //     })
            var processingPanel = this.WebPanel();
            console.log('processingPanel', processingPanel);
            //    console.log('processingPanel', processingPanel);
            //     processing = processingPanel.windowScriptObject()
            //     template = NSString.stringWithContentsOfFile_encoding_error(this.pluginSketch + "/template.html", NSUTF8StringEncoding, null);
            //processing.evaluateWebScript("processing('"  + Math.round( 50 ) +  "%', '" + "Processing the files that will be" + "')");
            //return;


            this.savePath = savePath;
            var idx = 1;
            var doc = self.document;
            var currentPage = self.page;
            var documentName = self.document.displayName().replace(/.sketch$/, "");
            var pageName = currentPage.name;
            // console.log('1', coscript);

            var fileGenerated = false;
            coscript.shouldKeepAround = true;

            var filePath = false;
            var fileId = false;
            var geometryPath = false;
            var error = false;
            var processMessage = _("Intialization...");
            console.log('2');
            coscript.scheduleWithRepeatingInterval_jsFunction(0, function (interval) {
                // self.message('Processing layer ' + idx + ' of ' + self.allCount);
                //Generate the source file
                if (idx > 20 && filePath === false && fileId === false && geometryPath === false && !error) {
                    // log("Generating the File.....");
                    console.log('generating file!', indx);
                    fileGenerated = true;
                    processMessage = "Generating the source document..";
                    processing.evaluateWebScript("processing('" + Math.round(idx) + "%', '" + processMessage + "')");
                    var stringsAsJson = translate.generateLocaleForPage(currentPage);
                    filePath = _files2['default'].generateFile(context, stringsAsJson, pageName);
                }
                console.log('3');

                if (idx > 40 && filePath != false && fileId === false && geometryPath === false && !error) {
                    processMessage = _("Uploading the source document..");
                    processing.evaluateWebScript("processing('" + Math.round(idx) + "%', '" + processMessage + "')");
                    //upload the file
                    fileId = postFile(context, filePath, organizationID, projectID, documentName + " - " + pageName);
                    if (fileId === false) {
                        error = true;
                    }
                    _utils2['default'].saveFileIdForPage(projectID, documentName, currentPage, fileId, self.context);
                    // log("file id is: " + fileId)
                }
                console.log('4');
                if (idx > 70 && filePath != false && fileId != false && geometryPath === false && hasArtboards) {
                    processMessage = _("Uploading the reference document..");
                    processing.evaluateWebScript("processing('" + Math.round(idx) + "%', '" + processMessage + "')");
                    var screenShotFile = _files2['default'].exportPageToPng(context, currentPage);

                    // log("screenShotFile file name: " + screenShotFile)

                    geometryPath = self.specExport();
                    if (geometryPath) {
                        geometryPath = geometryPath + "index.html";
                    }
                    var reference_id = postReference(context, screenShotFile, geometryPath, organizationID, projectID, fileId.fileId, documentName + " - " + pageName);
                    if (reference_id === false) {
                        error = true;
                    }
                }
                console.log('5');

                if (idx > 40 && filePath === false) {
                    //upload the file
                    coscript.shouldKeepAround = false;
                    fireError("Error!", _("an error happened while genertaing source document, please try again."));
                    return interval.cancel();
                }
                console.log('6');

                if (idx > 70 && fileId === false && geometryPath === false) {
                    //upload the file
                    coscript.shouldKeepAround = false;
                    fireError("Error!", _("an error happened while uploading the document, please try again."));
                    return interval.cancel();
                }
                console.log('7');
                //Handle the errors

                idx++;
                // processing.evaluateWebScript("processing('"  + Math.round( idx ) +  "%', '" + processMessage + "')");
                console.log('do we reach here?');

                if (idx > 100 && filePath != false && fileId != false && geometryPath != false) {
                    coscript.shouldKeepAround = false;
                    console.log('Uploading to Qordoba');
                    fireError("Success!", "Your page \"" + documentName + " - " + pageName + "\" has been uploaded to Qordoba.");
                    return interval.cancel();
                }

                if (idx > 100 && filePath != false && fileId != false && geometryPath == false && !hasArtboards) {
                    coscript.shouldKeepAround = false;
                    fireError("Success!", "Your page \"" + documentName + " - " + pageName + "\" has been uploaded to Qordoba. \nNote: Qordoba couldn't upload the page preview because the selected page has no artboards!");
                    return interval.cancel();
                }
            });
        }

        return upload;
    }(),
    specExport: function () {
        function specExport() {
            var self = this,
                savePath = NSTemporaryDirectory();
            // log("Saving the reference at: " + savePath);
            this.selectionArtboards = this.page.artboards().slice(0, 5);
            //self.message(_("Exporting..."));

            this.savePath = savePath;
            var artboardIndex = 0,
                layerIndex = 0,
                data = {
                scale: self.configs.scale,
                unit: self.configs.unit,
                colorFormat: self.configs.colorFormat,
                artboards: [],
                slices: [],
                colors: []
            },
                template = NSString.stringWithContentsOfFile_encoding_error(this.pluginSketch + "/template.html", NSUTF8StringEncoding, nil);

            self.single = false;

            //Generate artboards data
            for (artboardIndex = 0; artboardIndex < this.selectionArtboards.length; artboardIndex++) {
                // log("Export artboard num: " + artboardIndex);
                if (!data.artboards[artboardIndex]) {
                    data.artboards.push({ layers: [], notes: [] });
                    self.maskCache = [];
                    self.maskObjectID = undefined;
                    self.maskRect = undefined;
                }

                var artboard = self.selectionArtboards[artboardIndex],
                    page = artboard.parentGroup(),
                    artboardChildrenLength = artboard.children().length;

                for (layerIndex = 0; layerIndex < artboardChildrenLength; layerIndex++) {
                    var layer = artboard.children()[layerIndex];
                    self.getLayer(artboard, // Sketch artboard element
                    layer, // Sketch layer element
                    data.artboards[artboardIndex] // Save to data
                    );
                    if (self.is(layer, MSArtboardGroup)) {
                        // log(layer);
                        var objectID = artboard.objectID(),
                            artboardRect = self.getRect(artboard),
                            page = artboard.parentGroup(),
                            name = self.toSlug(page.name() + ' ' + artboard.name());

                        data.artboards[artboardIndex].pageName = self.toHTMLEncode(page.name());
                        data.artboards[artboardIndex].pageObjectID = self.toJSString(page.objectID());
                        data.artboards[artboardIndex].name = self.toHTMLEncode(artboard.name());
                        data.artboards[artboardIndex].objectID = self.toJSString(artboard.objectID());
                        data.artboards[artboardIndex].width = artboardRect.width;
                        data.artboards[artboardIndex].height = artboardRect.height;
                        // data.artboards[artboardIndex].imagePath = "preview/" + objectID + ".png";
                        var imageURL = NSURL.fileURLWithPath(self.exportImage({
                            layer: artboard,
                            scale: 0.5,
                            name: objectID
                        })),
                            imageData = NSData.dataWithContentsOfURL(imageURL),
                            imageBase64 = imageData.base64EncodedStringWithOptions(0);
                        data.artboards[artboardIndex].imageBase64 = 'data:image/png;base64,' + imageBase64;
                    }
                }
            }

            var selectingPath = savePath;
            if (self.configs.exportOption) {
                self.writeFile({
                    content: self.template(template, { lang: language, data: JSON.stringify(data).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') }),
                    path: self.toJSString(savePath),
                    fileName: "index.html"
                });
                selectingPath = savePath + "/index.html";
            }
            //NSWorkspace.sharedWorkspace().activateFileViewerSelectingURLs(NSArray.arrayWithObjects(NSURL.fileURLWithPath(selectingPath)));
            //self.message(_("Export complete!"));
            return savePath;
        }

        return specExport;
    }(),
    writeFile: function () {
        function writeFile(options) {
            var options = this.extend(options, {
                content: "Type something!",
                path: this.toJSString(NSTemporaryDirectory()),
                fileName: "temp.txt"
            }),
                content = NSString.stringWithString(options.content),
                savePathName = [];

            NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(options.path, true, nil, nil);

            savePathName.push(options.path, "/", options.fileName);
            savePathName = savePathName.join("");

            content.writeToFile_atomically_encoding_error(savePathName, false, NSUTF8StringEncoding, null);
        }

        return writeFile;
    }(),
    exportImage: function () {
        function exportImage(options) {
            var options = this.extend(options, {
                layer: this.artboard,
                path: this.toJSString(NSTemporaryDirectory()),
                scale: 1,
                name: "preview",
                suffix: "",
                format: "png"
            }),
                document = this.document,
                slice = MSExportRequest.exportRequestsFromExportableLayer(options.layer).firstObject(),
                savePathName = [];

            slice.scale = options.scale;
            slice.format = options.format;

            savePathName.push(options.path, "/", options.name, options.suffix, ".", options.format);
            savePathName = savePathName.join("");

            document.saveArtboardOrSlice_toFile(slice, savePathName);

            return savePathName;
        }

        return exportImage;
    }(),
    getLayer: function () {
        function getLayer(artboard, layer, data, symbolLayer) {
            var artboardRect = artboard.absoluteRect(),
                group = layer.parentGroup(),
                layerStates = this.getStates(layer);

            if (layer && this.is(layer, MSLayerGroup) && /NOTE\#/.exec(layer.name())) {
                var textLayer = layer.children()[2];

                data.notes.push({
                    rect: this.rectToJSON(textLayer.absoluteRect(), artboardRect),
                    note: this.toHTMLEncode(textLayer.stringValue()).replace(/\n/g, "<br>")
                });

                layer.setIsVisible(false);
            }

            if (!this.isExportable(layer) || !layerStates.isVisible || layerStates.isLocked && !this.is(layer, MSSliceLayer) || layerStates.isEmpty || layerStates.hasSlice || layerStates.isMeasure) {
                return this;
            }

            var layerType = this.is(layer, MSTextLayer) ? "text" : this.is(layer, MSSymbolInstance) ? "symbol" : this.is(layer, MSSliceLayer) || this.hasExportSizes(layer) ? "slice" : "shape",
                layerData = {
                objectID: this.toJSString(layer.objectID()),
                type: layerType,
                name: this.toHTMLEncode(layer.name()),
                rect: this.rectToJSON(layer.absoluteRect(), artboardRect)
            };

            if (symbolLayer) layerData.objectID = this.toJSString(symbolLayer.objectID());

            if (!(layerType == "slice" || layerType == "symbol")) {
                var layerStyle = layer.style();
                layerData.rotation = layer.rotation();
                layerData.radius = this.getRadius(layer);
                layerData.borders = this.getBorders(layerStyle);
                layerData.fills = this.getFills(layerStyle);
                layerData.shadows = this.getShadows(layerStyle);
                layerData.opacity = this.getOpacity(layerStyle);
                layerData.styleName = this.getStyleName(layer);
            }

            if (layerType == "text") {
                layerData.content = this.toHTMLEncode(layer.stringValue());
                layerData.color = this.colorToJSON(layer.textColor());
                layerData.fontSize = layer.fontSize();
                layerData.fontFace = this.toJSString(layer.fontPostscriptName());
                layerData.textAlign = TextAligns[layer.textAlignment()];
                layerData.letterSpacing = this.toJSNumber(layer.characterSpacing());
                layerData.lineHeight = layer.lineHeight();
            }

            var layerCSSAttributes = layer.CSSAttributes(),
                css = [];

            for (var i = 0; i < layerCSSAttributes.count(); i++) {
                var c = layerCSSAttributes[i];
                if (!/\/\*/.exec(c)) css.push(this.toJSString(c));
            }
            if (css.length > 0) layerData.css = css;

            this.checkMask(group, layer, layerData, layerStates);
            this.checkSlice(layer, layerData, symbolLayer);
            data.layers.push(layerData);
            this.checkSymbol(artboard, layer, layerData, data);
        }

        return getLayer;
    }(),
    template: function () {
        function template(content, data) {
            var content = content.replace(new RegExp("\\<\\!\\-\\-\\s([^\\s\\-\\-\\>]+)\\s\\-\\-\\>", "gi"), function ($0, $1) {
                if ($1 in data) {
                    return data[$1];
                } else {
                    return $0;
                }
            });
            return content;
        }

        return template;
    }(),
    languageSettingsPanel: function () {
        function languageSettingsPanel(context) {
            var self = this,
                data = {};

            var languages = getLanguagesArray(context);
            //var languageNames = utils.getNames(languages)

            //utils.resetLanguageSettings(context);
            data = {
                languages: [],
                fonts: [],
                settings: _utils2['default'].getLanguageSettings(context)
            };
            for (var i = 0; i < languages.count(); i++) {
                data.languages.push({
                    id: (languages[i].name + "").toLowerCase(),
                    name: languages[i].name + ""
                });
            }
            var doc = context.document;
            var fontList = doc.documentData().fontList();
            fontList.reloadFonts();
            var fonts = fontList.allFonts();
            for (var i = 0; i < fonts.count(); i++) {
                data.fonts.push({
                    id: (fonts[i] + "").toLowerCase(),
                    name: fonts[i] + ""
                });
            }

            return this.WebPanel({
                url: this.pluginSketch + "/panel/language_settings.html",
                width: 702,
                height: 500,
                data: data,
                callback: function () {
                    function callback(data) {
                        // log("Final Data ***** ")
                        // log(data)
                        _utils2['default'].saveLanguageSettings(data, context);
                    }

                    return callback;
                }(),
                titleBgColor: {
                    r: 1,
                    g: 1,
                    b: 1,
                    a: 1
                },
                contentBgColor: {
                    r: 1,
                    g: 1,
                    b: 1,
                    a: 1
                },
                hideClostButton: false
            });
        }

        return languageSettingsPanel;
    }()
});

exports['default'] = qordobaSDK;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//  MochaJSDelegate.js
//  MochaJSDelegate
//
//  Created by Matt Curtis
//  Copyright (c) 2015. All rights reserved.
//

var MochaJSDelegate = function MochaJSDelegate(selectorHandlerDict) {
	var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString();

	var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);

	delegateClassDesc.registerClass();

	//	Handler storage

	var handlers = {};

	//	Define interface

	this.setHandlerForSelector = function (selectorString, func) {
		var handlerHasBeenSet = selectorString in handlers;
		var selector = NSSelectorFromString(selectorString);

		handlers[selectorString] = func;

		if (!handlerHasBeenSet) {
			/*
   	For some reason, Mocha acts weird about arguments:
   	https://github.com/logancollins/Mocha/issues/28
   		We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
   */

			var dynamicHandler = function dynamicHandler() {
				var functionToCall = handlers[selectorString];

				if (!functionToCall) return;

				return functionToCall.apply(delegateClassDesc, arguments);
			};

			var args = [],
			    regex = /:/g;
			while (match = regex.exec(selectorString)) {
				args.push("arg" + args.length);
			}dynamicFunction = eval("(function(" + args.join(",") + "){ return dynamicHandler.apply(this, arguments); })");

			delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
		}
	};

	this.removeHandlerForSelector = function (selectorString) {
		delete handlers[selectorString];
	};

	this.getHandlerForSelector = function (selectorString) {
		return handlers[selectorString];
	};

	this.getAllHandlers = function () {
		return handlers;
	};

	this.getClass = function () {
		return NSClassFromString(uniqueClassName);
	};

	this.getClassInstance = function () {
		return NSClassFromString(uniqueClassName)["new"]();
	};

	//	Conveience

	if ((typeof selectorHandlerDict === "undefined" ? "undefined" : _typeof(selectorHandlerDict)) == "object") {
		for (var selectorString in selectorHandlerDict) {
			this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
		}
	}
};

exports["default"] = MochaJSDelegate;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var fileHelper = {
	createFolderAtPath: function () {
		function createFolderAtPath(context, pathString) {
			var fileManager = NSFileManager.defaultManager;
			if (fileManager.fileExistsAtPath(pathString)) {
				return true;
			} else {
				// return [fileManager createDirectoryAtPath:pathString withIntermediateDirectories:true attributes:nil error:nil]
				return fileManager.createDirectoryAtPath(pathString, true, null, null);
			}
		}

		return createFolderAtPath;
	}(),

	readTextFromFile: function () {
		function readTextFromFile(context, filePath) {
			// var fileManager = [NSFileManager defaultManager]
			var fileManager = NSFileManager.defaultManager;
			// if([fileManager fileExistsAtPath:filePath]) {
			if (fileManager.fileExistsAtPath(filePath)) {
				// var log = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
				var log = NSString.stringWithContentsOfFile(filePath, NSUTF8StringEncoding, null);
				if (log) {
					return log;
				}
				NSLog("Could not get log file data");
				return false;
			}
			return false;
		}

		return readTextFromFile;
	}(),

	removeFileOrFolder: function () {
		function removeFileOrFolder(filePath) {
			// [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
			NSFileManager.defaultManager.removeItemAtPath(filePath, null);
		}

		return removeFileOrFolder;
	}(),

	exportPageToPng: function () {
		function exportPageToPng(context, page) {
			if (!context) {
				NSLog("No context and text was provided for log");
				return false;
			}

			if (!page) {
				NSLog("No text was provided for log");
				return false;
			}

			var doc = context.document;
			// var frame = [page contentBounds];
			var frame = page.contentBounds;
			// var fileName = [page name];
			var fileName = page.name;
			// var exportRequest = [MSExportRequest new]
			var exportRequest = new MSExportRequest();
			//exportRequest.rect  = frame;
			var tmpPath = NSTemporaryDirectory();
			var fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".png";
			//just remove the file to make sure
			this.removeFile(tmpPath + fileName, context);

			if (frame.size.width <= 10000 || frame.size.height <= 10000) {
				exportRequest.rect = frame;
			} else if (page.artboards().count() > 0) {
				//get the first artboards
				var layer = page.artboards().firstObject();
				exportRequest = MSExportRequest.exportRequestsFromExportableLayer(layer).firstObject();
			} else {
				var layers = page.containedLayers();
				var layer = null;
				for (var i = 0; i < layers.count(); i++) {
					if (layers[i].isVisible() && layers[i]["class"]() == MSLayerGroup) {
						layer = layers[i];
						break;
					}
				}

				exportRequest.rect = layer.absoluteRect(); //CGRectMake(layer.absoluteRect().x, layer.absoluteRect().y, 10000,10000);
			}

			exportRequest.scale = 1;
			if (this.createFolderAtPath(context, tmpPath)) {
				var filePath = tmpPath + fileName;
				doc.saveArtboardOrSlice_toFile(exportRequest, filePath);
				return filePath;
			} else {
				NSLog("Unable to create forlder at " + tmpPath + fileName);
				return false;
			}
		}

		return exportPageToPng;
	}(),
	writeStringToFile: function () {
		function writeStringToFile(context, text, filePath) {
			var aFileHandle;
			var aFile;
			var t;
			// t = [NSString stringWithFormat:@"%@", text],
			t = NSString.stringWithFormat("%@", text),
			// aFile = [NSString stringWithFormat:"%@", filePath]
			aFile = NSString.stringWithFormat("%@", filePath);

			// aFileHandle = [NSFileHandle fileHandleForWritingAtPath:aFile]
			aFileHandle = NSFileHandle.fileHandleForWritingAtPath(aFile);

			if (aFileHandle) {
				// [aFileHandle truncateFileAtOffset:[aFileHandle seekToEndOfFile]]
				// [aFileHandle writeData:[t dataUsingEncoding:NSUTF8StringEncoding]]
				aFileHandle.truncateFileAtOffset(aFileHandle.seekToEndOfFile());
				aFileHandle.writeData(t.dataUsingEncoding(NSUTF8StringEncoding));
			} else {
				// [t writeToFile:aFile atomically:true encoding:NSUTF8StringEncoding error:nil]
				t.writeToFile(aFile, true, NSUTF8StringEncoding, null);
			}
		}

		return writeStringToFile;
	}(),

	generateFile: function () {
		function generateFile(context, text, fileName) {
			if (!context) {
				if (text) {
					NSLog("No context was provided for log : " + text);
				} else {
					NSLog("No context and text was provided for log");
				}

				return false;
			}

			if (!text) {
				NSLog("No text was provided for log");
				return false;
			}

			var tmpPath = NSTemporaryDirectory();
			var fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".csv";
			//just remove the file to make sure
			this.removeFile(tmpPath + fileName, context);

			if (this.createFolderAtPath(context, tmpPath)) {
				this.writeStringToFile(context, text, tmpPath + fileName);
				return tmpPath + fileName;
			}
		}

		return generateFile;
	}(),

	getTmpDirectory: function () {
		function getTmpDirectory(context) {
			return NSTemporaryDirectory();
		}

		return getTmpDirectory;
	}(),

	getCurrentTime: function () {
		function getCurrentTime() {
			// var DateFormatter=[[NSDateFormatter alloc] init]
			var DateFormatter = NSDateFormatter.alloc().init();
			DateFormatter.setDateFormat("yyyy-MM-dd hh:mm:ss");
			// return [DateFormatter stringFromDate:[NSDate date]]
			return DateFormatter.stringFromDate(NSDate.date);
		}

		return getCurrentTime;
	}(),
	copyFile: function () {
		function copyFile(srcPath, dstPath, context) {
			//just remove the file, in case it's there
			this.removeFile(dstPath, context);
			// return [[NSFileManager defaultManager] copyItemAtPath:srcPath toPath:dstPath error:nil];
			return NSFileManager.defaultManager.copyItemAtPath(srcPath, dstPath, null);
		}

		return copyFile;
	}(),
	removeFile: function () {
		function removeFile(filePath, context) {
			// return [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
			return NSFileManager.defaultManager.removeItemAtPath(filePath, null);
		}

		return removeFile;
	}(),
	csvToJson: function () {
		function csvToJson(csv) {
			var str = csv;
			var regexp = /([\s\S]*?):q:q:q:q:s:([\s\S]*?):q:q:q:q:e:/gm;
			//var regexp = /^([\s\S]*?):q:q:q:q:m:([\s\S]*?)$/gm;
			var jsonObj = {};
			var matches_array = str.replace(regexp, function (match, key, val) {
				//key = key.replace(/^\n/, '');
				jsonObj[key] = val;
			});
			return jsonObj;
		}

		return csvToJson;
	}(),
	jsonToCsv: function () {
		function jsonToCsv(json) {
			var seperator = ":q:q:q:q:s:";
			var endOfLine = ":q:q:q:q:e:";
			var str = "";
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					str += key + seperator + json[key] + endOfLine;
				}
			}
			return str;
		}

		return jsonToCsv;
	}()
};

exports["default"] = fileHelper;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
var utils = utils || {};
utils = {
  // "getPageId" : function(page){
  //   var string = page.toString()
  //   // var openRange = [string rangeOfString:@"("]
  //   // var closeRange = [string rangeOfString:@")"]
  //   var openRange = string.rangeOfString("(")
  //   var closeRange = string.rangeOfString(")")
  //   var length = closeRange.location - openRange.location -1
  //   // return [[string substringFromIndex:NSMaxRange(openRange)] substringToIndex:length]
  //   return string.substringFromIndex(NSMaxRange(openRange)).substringToIndex(length)
  // },

  // "isRetinaDisplay": function(){
  //   return NSScreen.isOnRetinaScreen();
  // },

  // "escapedFileName": function(string){
  //   // var notAllowedChars = [NSCharacterSet characterSetWithCharactersInString:@"\\<>=,!#$&'()*+/:;=?@[]%"];
  //   // var cleanString = [[string componentsSeparatedByCharactersInSet:notAllowedChars] componentsJoinedByString:@""];
  //   var notAllowedChars = NSCharacterSet.characterSetWithCharactersInString("\\<>=,!#$&'()*+/:;=?@[]%");
  //   var cleanString = string.componentsSeparatedByCharactersInSet.notAllowedChars().componentsJoinedByString("");
  //   return cleanString
  // },

  // "createLabel": function(text, rect) {
  //   // var label = [[NSTextField alloc] initWithFrame:rect]
  //   var label = NSTextField.alloc().initWithFrame(rect)
  //   label.stringValue = text
  //   label.editable = false
  //   label.borderd = false
  //   label.bezeled = false
  //   label.setAlignment(1)
  //   label.useSingleLineMode = true
  //   label.drawsBackground = false
  //   return label
  // },

  // "getNames" : function(objs){
  //     var arr = []
  //     for (i = 0; i < objs.length; ++i) {
  //         arr.push(objs[i].name);
  //     }
  //     return arr;
  //   },

  // "getArrayNames" : function(objs){
  //     var arr = []
  //     for (i = 0; i < objs.length; ++i) {
  //         arr.push(objs[i].name);
  //     }
  //     return arr;
  //   },
  // "getIndexOfArray": function(objs, name){
  //   var index = 0;
  //   for (i = 0; i < objs.length; ++i) {
  //     if(name == objs[i]){
  //       index = i;
  //       return index;
  //     }
  //   }
  //   return index;
  // },
  // "getIndexOf": function(objs, name){
  //   var index = 0;
  //   for (i = 0; i < objs.length; ++i) {
  //     if(name == objs[i]){
  //       index = i;
  //       return index;
  //     }
  //   }
  //   return index;
  // },
  "saveActiveTokenToComputer": function () {
    function saveActiveTokenToComputer(context, token, userid, username, useremail, webContents) {
      // [[NSUserDefaults standardUserDefaults] setObject:token forKey:"QUSER_qordoba_token" + "_" + qordobaSDK.common.version]
      // [[NSUserDefaults standardUserDefaults] setObject:userid forKey:"QUSER_qordoba_user_id" + "_" + qordobaSDK.common.version]
      // [[NSUserDefaults standardUserDefaults] setObject:username forKey:"QUSER_qordoba_user_name" + "_" + qordobaSDK.common.version]
      // [[NSUserDefaults standardUserDefaults] setObject:useremail forKey:"QUSER_qordoba_user_email" + "_" + qordobaSDK.common.version]
      // [[NSUserDefaults standardUserDefaults] synchronize]

      // NSUserDefaults.standardUserDefaults(token, "QUSER_qordoba_token" + "_" + qordobaSDK.common.version)
      // NSUserDefaults.standardUserDefaults(userid, "QUSER_qordoba_user_id" + "_" + qordobaSDK.common.version)
      // NSUserDefaults.standardUserDefaults(username, "QUSER_qordoba_user_name" + "_" + qordobaSDK.common.version)
      // NSUserDefaults.standardUserDefaults(useremail, "QUSER_qordoba_user_email" + "_" + qordobaSDK.common.version)
      // NSUserDefaults.standardUserDefaults(synchronize)
      var userDefaults = NSUserDefaults.standardUserDefaults();
      userDefaults.setObject_forKey(token, 'QUSER_qordoba_token');
      userDefaults.setObject_forKey(userid, 'QUSER_qordoba_user_id');
      userDefaults.setObject_forKey(username, 'QUSER_qordoba_user_name');
      userDefaults.setObject_forKey(useremail, 'QUSER_qordoba_user_email');
      var storedToken = userDefaults.objectForKey('QUSER_qordoba_token');
      webContents.executeJavaScript('logInfoToRollbar("' + String(useremail) + '", "Storing user\'s token on computer under key QUSER_qordoba_token.(src/utils.js)")');
    }

    return saveActiveTokenToComputer;
  }()

  // "getUserName": function(context) {
  //   // var value = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_user_name" + "_" + qordobaSDK.common.version];
  //     var value = NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_name" + "_" + qordobaSDK.common.version);
  //   if (value) {
  //     return value;
  //   } else {
  //     return false;
  //   }
  // },

  // "getUserEmail": function(context) {
  //   // var value = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_user_email" + "_" + qordobaSDK.common.version];
  //   var value = NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_email" + "_" + qordobaSDK.common.version);
  //   if (value) {
  //     return value;
  //   } else {
  //     return false;
  //   }
  // },
  // "getUserId": function(context) {
  //   // var value = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_user_id" + "_" + qordobaSDK.common.version];
  //   var value = NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_id" + "_" + qordobaSDK.common.version);
  //   if (value) {
  //     return value;
  //   } else {
  //     return false;
  //   }
  // },

  // "deleteActiveToken": function(context) {
  //   // [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"QUSER_qordoba_token" + "_" + qordobaSDK.common.version];
  //   // [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"QUSER_qordoba_user_id" + "_" + qordobaSDK.common.version];
  //   // [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"QUSER_qordoba_user_name" + "_" + qordobaSDK.common.version];
  //   // [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"QUSER_qordoba_user_email" + "_" + qordobaSDK.common.version];
  //   NSUserDefaults.standardUserDefaults("QUSER_qordoba_token" + "_" + qordobaSDK.common.version)
  //   NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_id" + "_" + qordobaSDK.common.version)
  //   NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_name" + "_" + qordobaSDK.common.version)
  //   NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_email" + "_" + qordobaSDK.common.version)
  //   this.deleteAllKeys(context)
  // },
  // "saveUserOrganizations": function(context,organizations) {
  //     // [[NSUserDefaults standardUserDefaults] setObject:organizations forKey:"QUSER_qordoba_user_organizations" + "_" + qordobaSDK.common.version]
  //     // [[NSUserDefaults standardUserDefaults] synchronize]
  //     NSUserDefaults.standardUserDefaults(organizations, "QUSER_qordoba_user_organizations" + "_" + qordobaSDK.common.version)
  //     NSUserDefaults.standardUserDefaults(synchronize)
  // },

  // "getUserOrganizations": function(context) {
  //   // var value = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_user_organizations" + "_" + qordobaSDK.common.version];
  //   var value = NSUserDefaults.standardUserDefaults("QUSER_qordoba_user_organizations" + "_" + qordobaSDK.common.version);
  //   if (value) {
  //     return value;
  //   } else {
  //     return false;
  //   }
  // },
  // "fireError": function(title,text){
  //   // [app displayDialog:text withTitle:title]
  //   app.displayDialog(text, title)
  // },
  // "deleteAllKeys": function(context){
  //   // var defaultsDictionary = [[NSUserDefaults standardUserDefaults] dictionaryRepresentation];
  //   // var keys = [defaultsDictionary allKeys]
  //   var defaultsDictionary = NSUserDefaults.standardUserDefaults(dictionaryRepresentation);
  //   var keys = defaultsDictionary.allKeys();
  //   for (i = 0; i < keys.count(); ++i) {
  //       var key = keys[i]
  //       if(key.hasPrefix("QUSER")){
  //         // [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
  //         NSUserDefaults.standardUserDefaults.removeObjectForKey(key);
  //       }
  //   }
  //   // [[NSUserDefaults standardUserDefaults] synchronize];
  //   NSUserDefaults.standardUserDefaults.synchronize();
  // },
  //   "getOrganization": function(context){
  //     var object = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba connected organization" + "_" + qordobaSDK.common.version];
  //     if (object) {
  //       return object;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveOrganization": function(organization, context){
  //     [[NSUserDefaults standardUserDefaults] setObject:organization forKey:"QUSER_qordoba connected organization" + "_" + qordobaSDK.common.version]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "getProject": function(context){
  //     var object = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba connected project" + "_" + qordobaSDK.common.version];
  //     if (object) {
  //       return object;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveProject": function(project, context){
  //     [[NSUserDefaults standardUserDefaults] setObject:project forKey:"QUSER_qordoba connected project" + "_" + qordobaSDK.common.version]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "getTargetLanguage": function(context){
  //     var object = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba connected project target language" + "_" + qordobaSDK.common.version];
  //     if (object) {
  //       return object;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveTargetLanguage": function(language, context){
  //     [[NSUserDefaults standardUserDefaults] setObject:language forKey:"QUSER_qordoba connected project target language" + "_" + qordobaSDK.common.version]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "getOrganizationProjects": function(organizationId, context){
  //     var object = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba organization id:"+ organizationId+": projects" + "_" + qordobaSDK.common.version];
  //     if (object) {
  //       return object;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveOrganizationProjects": function(organizationId, projects, context){
  //     [[NSUserDefaults standardUserDefaults] setObject:projects forKey:"QUSER_qordoba organization id:"+ organizationId+": projects" + "_" + qordobaSDK.common.version]]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },
  //   "saveLanguages": function(context,languages){
  //     [[NSUserDefaults standardUserDefaults] setObject:languages forKey:"QUSER_qordoba_languages" + "_" + qordobaSDK.common.version]]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },
  //   "getLanguages": function(context){
  //     var object = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_languages" + "_" + qordobaSDK.common.version];
  //     if (object) {
  //       return object;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "getOrganizations": function(context){
  //     var object = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_user_organizations" + "_" + qordobaSDK.common.version];
  //     if (object) {
  //       return object;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveOrganizations": function(organizations, context){
  //      [[NSUserDefaults standardUserDefaults] setObject:organizations forKey:"QUSER_qordoba_user_organizations" + "_" + qordobaSDK.common.version]
  //      [[NSUserDefaults standardUserDefaults] synchronize]
  //     },

  //     "saveFileIdForPage": function(projectId,documentName, page, fileId, context) {
  //       var pageId = page.objectID()
  //       [[NSUserDefaults standardUserDefaults] setObject:fileId forKey:"QUSER_qordoba_org_api_key_" + projectId +"_"+ documentName + "-" + pageId];
  //       [[NSUserDefaults standardUserDefaults] synchronize]
  //     },

  //     "getFileIdForPage": function(projectId,documentName,page,context) {
  //       var pageId = page.objectID()
  //       var key = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_org_api_key_" +projectId +"_"+ documentName + "-" + pageId];
  //       if (key) {
  //         return key;
  //       } else {
  //         return false;
  //       }
  //     },

  //     "deleteFileIdForPage": function(projectId,documentName,page,context) {
  //       var pageId = page.objectID()
  //       [[NSUserDefaults standardUserDefaults] removeObjectForKey:"QUSER_qordoba_org_api_key_" +projectId +"_"+ documentName + "-" + pageId];
  //     },

  //     "addGeneratedPage": function(page,context){
  //       var pages = [NSMutableArray arrayWithArray:[[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_generated_pages"]];
  //       if (!pages) {
  //         pages =  [NSMutableArray array];
  //       }
  //       var pageId = page.objectID()
  //       [pages addObject:pageId]
  //       [[NSUserDefaults standardUserDefaults] setObject:pages forKey:"QUSER_qordoba_generated_pages"];
  //       [[NSUserDefaults standardUserDefaults] synchronize]
  //     },
  //     "isGeneratedPage": function(page,context){
  //       var pages = [NSMutableArray arrayWithArray:[[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_generated_pages"]];
  //       var pageId = page.objectID()
  //       return [pages containsObject:pageId]
  //     },
  //     "getDebugSetting": function(context){
  //     var debug = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_debug"]
  //     if (debug) {
  //       return debug
  //     } else {
  //       return 1
  //       //return 0
  //     }
  //   },

  //   "saveDebugSetting": function(debugValue,context){
  //     [[NSUserDefaults standardUserDefaults] setObject:debugValue forKey:"QUSER_debug"]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "getLastUsedProject": function(context){
  //     var last = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba last used project" + "_" + qordobaSDK.common.version];
  //     if (last) {
  //       return last;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveLastUsedProject": function(projectId,context){
  //     [[NSUserDefaults standardUserDefaults] setObject:projectId forKey:"QUSER_qordoba last used project" + "_" + qordobaSDK.common.version]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "getLastVersionChecked": function(context){
  //     var last = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_last_version_checked"];
  //     if (last) {
  //       return last;
  //     } else {
  //       return [NSDate date];
  //     }
  //   },
  //   "checkLastVersionChecked": function(context){
  //     var last = this.getLastVersionChecked(context);
  //     var dateNow = [NSDate date];
  //     var secondsBetween = [dateNow timeIntervalSinceDate:last];
  //     //if(secondsBetween > 100){
  //     if(secondsBetween/86400 > 1){
  //       return true;
  //     }else {
  //       return false;
  //     }
  //   },

  //   "setLastVersionChecked": function(datetime,context){
  //     [[NSUserDefaults standardUserDefaults] setObject:datetime forKey:"QUSER_qordoba_last_version_checked"]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "getLastUsedOrganization": function(context){
  //     var last = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba last used organization" + "_" + qordobaSDK.common.version];
  //     if (last) {
  //       return last;
  //     } else {
  //       return false;
  //     }
  //   },

  //   "saveLastUsedOrganization": function(projectId,context){
  //     [[NSUserDefaults standardUserDefaults] setObject:projectId forKey:"QUSER_qordoba last used organization" + "_" + qordobaSDK.common.version]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },

  //   "filterArray": function(myArray,searchTerm, property){
  //     var len = myArray.length;
  //     var newArray = []
  //     for(var i = 0; i < len; i++) {
  //           if (myArray[i][property].toLowerCase != searchTerm.toLowerCase){
  //             newArray.push(myArray[i])
  //           }
  //       }
  //       return newArray;
  //   },
  //   "findFirstInArray": function(myArray,searchTerm, property){
  //     var len = myArray.length;
  //     for(var i = 0; i < len; i++) {
  //           if (myArray[i][property].toLowerCase === searchTerm.toLowerCase){
  //             return myArray[i];
  //           }
  //     }
  //       return false;
  //   },

  //   "arrayObjectIndexOf": function(myArray, searchTerm, property) {
  //     var len = myArray.length;
  //     for(var i = 0; i < len; i++) {
  //           if (myArray[i][property] == searchTerm){
  //             return i;
  //           }
  //       }
  //       return -1;
  //   },
  //   "resetLanguageSettings": function(context){
  //     [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"QUSER_qordoba_language_settings"];
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },
  //   "getLanguageSettings": function(context){
  //     var objs = [[NSUserDefaults standardUserDefaults] objectForKey:"QUSER_qordoba_language_settings"];
  //     if (objs) {
  //       objs = JSON.parse(objs)
  //       return objs;
  //     } else {
  //       return JSON.parse("[]");
  //     }
  //   },
  //   "getSettingForLanguage": function(context,language){
  //     language = language + ""
  //     var objs = this.getLanguageSettings(context)
  //     if (objs) {
  //       objs = objs.filter(function (el) {return (el.language.toLowerCase() === language.toLowerCase());});
  //       if(objs.length>0){
  //         return objs[0];
  //       }
  //     }
  //     return false
  //   },
  //   "removeLanguageSetting": function(context,language){
  //     settings = this.getLanguageSettings(context)
  //     settings = settings.filter(function (el) {return (el.language !=language);});
  //     this.saveLanguageSettings(settings,context)
  //     return settings;
  //   },
  //   "addLanguageSetting": function(context,obj){
  //     var settings = this.getLanguageSettings(context)
  //     var index = this.arrayObjectIndexOf(settings,obj.language,"language")
  //     if(index>=0){
  //       settings[index] = obj
  //     }else{
  //       settings.push(obj)
  //     }
  //     this.saveLanguageSettings(settings,context)
  //     return settings;
  //   },
  //   "saveLanguageSettings": function(languageSettings,context){
  //     languageSettings = JSON.stringify(languageSettings)
  //     [[NSUserDefaults standardUserDefaults] setObject:languageSettings forKey:"QUSER_qordoba_language_settings"]
  //     [[NSUserDefaults standardUserDefaults] synchronize]
  //   },
  // "getFontOf": function(context,fontName) {
  //     var doc = context.document
  //     var fontList = [doc fontList];

  //     //get index
  //     var objs = [fontList allFonts]
  //     var index = -1;
  //     for (i = 0; i < objs.count(); ++i) {
  //        if(objs[i].toLowerCase() === fontName.toLowerCase()){
  //           index = i;
  //        }
  //     }
  //     if(index >=0){
  //       var font =  [fontList fontForFontAtIndex:index]
  //       return font
  //     }
  //     return false;
  //   },
  //  "excludeSymbols": function(context){
  //     var doc = context.document
  //     var symbols = doc.documentData().layerSymbols().objects();
  //       for(var j = 0; j < symbols.count(); j++){
  //         var symbol = symbols[j];
  //         var layers = symbol.value().layers()
  //         for(var i = 0; i < layers.count(); i++){
  //           var layer = layers[i];
  //           if(layer.class() == MSTextLayer){
  //             [layer setPrimitiveDontSynchroniseWithSymbol:true];
  //           }else if(layer.class() == MSLayerGroup ){
  //             this.exlcudeGroups(context,layer.layers())
  //           }
  //         }
  //       }
  //   },
  // "exlcudeGroups": function(context,layers){
  //     for(var i = 0; i< layers.count(); i++){
  //       var layer = layers[i];
  //       if(layer.class() == MSTextLayer){
  //         [layer setPrimitiveDontSynchroniseWithSymbol:true];
  //         log(layer.dontSynchroniseWithSymbol());
  //       }else if(layer.class() == MSLayerGroup ){
  //         this.exlcudeGroups(context,layer.layers())
  //       }
  //     }
  //   }
};

var config = utils;
exports['default'] = utils;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
