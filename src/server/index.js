// only ES5 is allowed in this file
require("babel-register");

// to prevent the ReferenceError: regeneratorRuntime is not defined
// (that occurs because of the generator use with Babel)
require('babel-polyfill');

// other babel configuration, if necessary

// load your app
require("./server");
