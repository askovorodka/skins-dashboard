'use strict';

// require("babel-register")({
//   presets: ["es2015", "react", "stage-0"],
//   plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
// });

require('babel-register')({ presets: ['es2015', 'stage-0'] });
require('babel-polyfill');

// require("babel-register").transform("code", {
//   presets: ["es2015", "react", "stage-0"],
//   plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
// });

var server = require('./server.js').default;
var port = 3333;

server.listen(port, function () {
  console.log('Example app listening on port '+port +'!');
});