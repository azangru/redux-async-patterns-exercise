// из примера настройки работы Enzyme + Mocha:
// https://github.com/lelandrichardson/enzyme-example-mocha/tree/master/test

require('babel-register')();

// to prevent the ReferenceError: regeneratorRuntime is not defined
// (that occurs because of the generator use with Babel)
require('babel-polyfill');

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
