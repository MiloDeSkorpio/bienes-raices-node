/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/freeSub.js":
/*!***************************!*\
  !*** ./src/js/freeSub.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener('DOMContentLoaded', function() {\r\n  try {\r\n    // Tu código aquí\r\n    document.getElementById(\"pfree\").addEventListener('click', function () {\r\n      //Declaracion de variables\r\n      const idUsuario = document.getElementById(\"id\").value;\r\n      const url = `/adm/prueba/${idUsuario}`;\r\n      const method = 'PUT';\r\n      //Fetch al url\r\n      fetch(url, {\r\n        method,\r\n        headers: {\r\n          \"Content-Type\": \"application/json\",\r\n        }\r\n      });\r\n    });\r\n  } catch (error) {\r\n    console.error(\"Error:\", error);\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/freeSub.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/freeSub.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;