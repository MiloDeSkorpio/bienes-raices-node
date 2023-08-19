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

/***/ "./src/js/menu.js":
/*!************************!*\
  !*** ./src/js/menu.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// Obtener el enlace del footer actual basado en la ruta de la página\r\nfunction getCurrentFooterLink() {\r\n  const path = window.location.pathname;\r\n  if (path === \"/\") return document.getElementById(\"home-link\");\r\n  if (path === \"/buscador\") return document.getElementById(\"buscador-link\");\r\n  if (path === \"/favoritos\") return document.getElementById(\"favoritos-link\");\r\n  if (path === \"/verificadas\") return document.getElementById(\"verificadas-link\");\r\n  if (path === \"/ajustes\") return document.getElementById(\"ajustes-link\");\r\n}\r\n\r\n// Agregar la clase 'active' al enlace del footer actual\r\nfunction setActiveFooterLink() {\r\n  const currentFooterLink = getCurrentFooterLink();\r\n  if (currentFooterLink) {\r\n    currentFooterLink.classList.add(\"active\");\r\n  }\r\n}\r\n\r\nsetActiveFooterLink();\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/menu.js?");

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
/******/ 	__webpack_modules__["./src/js/menu.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;