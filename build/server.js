require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _express = __webpack_require__(1);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _dataSchema = __webpack_require__(2);
	
	var _expressGraphql = __webpack_require__(5);
	
	var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
	
	var app = (0, _express2['default'])();
	app.use('/', (0, _expressGraphql2['default'])({ schema: _dataSchema.Schema, pretty: true }));
	app.listen(9000, function (err) {
	  if (err) return console.error(err);
	  console.log('GraphQL Server is now running on localhost:9000');
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _graphql = __webpack_require__(3);
	
	var _graphqlRelay = __webpack_require__(4);
	
	var example = {
	  id: 1,
	  text: 'Hello World'
	};
	
	/**
	 * The first argument defines the way to resolve an ID to its object.
	 * The second argument defines the way to resolve a node object to its GraphQL type.
	 */
	
	var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
	  var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);
	
	  var id = _fromGlobalId.id;
	  var type = _fromGlobalId.type;
	
	  if (type === 'Example') return example;
	  return null;
	}, function (obj) {
	  return exampleType;
	});
	
	var nodeInterface = _nodeDefinitions.nodeInterface;
	var nodeField = _nodeDefinitions.nodeField;
	
	var exampleType = new _graphql.GraphQLObjectType({
	  name: 'Example',
	  fields: function fields() {
	    return {
	      id: (0, _graphqlRelay.globalIdField)('Example'),
	      text: {
	        type: _graphql.GraphQLString,
	        description: 'Hello World'
	      }
	    };
	  },
	  interfaces: [nodeInterface]
	});
	
	var queryType = new _graphql.GraphQLObjectType({
	  name: 'Query',
	  fields: function fields() {
	    return {
	      node: nodeField,
	      example: {
	        type: exampleType,
	        resolve: function resolve() {
	          return example;
	        }
	      }
	    };
	  }
	});
	
	var Schema = new _graphql.GraphQLSchema({
	  query: queryType
	});
	exports.Schema = Schema;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("graphql-relay");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map