(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["inGeojsonArea"] = factory();
	else
		root["inGeojsonArea"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function toPolygons(geojson) {\r\n\ttry {\r\n\t\tvar polygons = [];\r\n\t\tgeojson.features.forEach(feature => {\r\n\t\t\tif(feature.type == 'Feature') {\r\n\t\t\t\tif(feature.geometry.type == 'Polygon') {\r\n\t\t\t\t\tpolygons.push(turf.polygon([feature.geometry.coordinates[0]]));\r\n\t\t\t\t}else if(feature.geometry.type == 'MultiPolygon'){\r\n\t\t\t\t\tlet coordinatesSets = feature.geometry.coordinates;\r\n\t\t\t\t\tcoordinatesSets.forEach(set => {\r\n\t\t\t\t\t\tpolygons.push(turf.polygon(set));\r\n\t\t\t\t\t})\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t})\r\n\t\t\r\n\t\treturn polygons;\r\n\t} catch (error) {\r\n\t\tconsole.log(error);\r\n\t}\r\n}\r\n\r\nfunction areThey(points, geojson) {\r\n\ttry {\r\n\t\tlet polygons = toPolygons(geojson);\r\n\t\tlet result = [];\r\n\t\tlet isInside = false;\r\n\t\tpoints.forEach(point => {\r\n\t\t\tfor (var i = 0; i < polygons.length; i++) {\r\n\t\t\t\tif (turf.booleanPointInPolygon(turf.point(point), polygons[i])) {\r\n\t\t\t\t\tisInside = true;\r\n\t\t\t\t\tbreak;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\tresult.push({ point, isInside })\r\n\t\t\tisInside = false;\r\n\t\t})\r\n\r\n\t\treturn result;\r\n\t} catch (error) {\r\n\t\tconsole.log(error);\r\n\t}\r\n}\r\n\r\nfunction isThis(point, geojson) {\r\n\ttry {\r\n\t\tlet polygons = toPolygons(geojson);\r\n\t\tlet isInside = false;\r\n\r\n\t\tfor (var i = 0; i < polygons.length; i++) {\r\n\t\t\tif (turf.booleanPointInPolygon(turf.point(point), polygons[i])) {\r\n\t\t\t\tisInside = true;\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\treturn isInside;\r\n\t} catch (error) {\r\n\t\tconsole.log(error);\r\n\t}\r\n}\r\n\r\n\r\nif ((typeof turf) == undefined) {\r\n\tthrow 'turf is required to use this library. '\r\n} else {\r\n\tmodule.exports = {\r\n\t\tareThey,\r\n\t\tisThis\r\n\t}\r\n}\r\n\r\n\n\n//# sourceURL=webpack://inGeojsonArea/./src/index.js?");

/***/ })

/******/ });
});