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

eval("__webpack_require__.r(__webpack_exports__);\n// Verificar si la cookie de sesión existe\nfunction checkSessionCookie() {\n  const sessionCookie = getCookie('_token');\n  if (sessionCookie) {\n    // La cookie de sesión existe, el usuario ha iniciado sesión\n    console.log('El usuario ha iniciado sesión');\n    // Puedes realizar otras acciones aquí, como redireccionar al usuario a su área de inicio de sesión, cargar datos adicionales, etc.\n  } else {\n    // La cookie de sesión no existe, el usuario no ha iniciado sesión\n    console.log('El usuario no ha iniciado sesión');\n    // Puedes realizar acciones adicionales aquí, como mostrar un formulario de inicio de sesión, redireccionar a la página de inicio de sesión, etc.\n  }\n}\n\n// Obtener el valor de una cookie específica\nfunction getCookie(name) {\n  const cookies = document.cookie.split('; ');\n  for (let i = 0; i < cookies.length; i++) {\n    const cookie = cookies[i].split('=');\n    if (cookie[0] === name) {\n      return decodeURIComponent(cookie[1]);\n    }\n  }\n  return null;\n}\n\n// Verificar la existencia de la cookie de sesión al cargar la página\nwindow.addEventListener('load', checkSessionCookie);\n\nconsole.log(getCookie('_token'));\n\n\nconst btnMenu = document.querySelector('.btnMenu');\nconst menu = document.querySelector('#menu')\nconst btnClose = document.querySelector(\"#clearMenu\")\n    btnMenu.addEventListener('click', function () {\n        btnMenu.classList.add(\"hidden\")\n        btnClose.classList.remove(\"hidden\")\n        btnClose.classList.add(\"flex\")\n        menu.classList.remove(\"hidden\")\n        menu.classList.add('flex')     \n      });\n      btnClose.addEventListener('click', function () {\n        btnMenu.classList.remove(\"hidden\")\n        btnMenu.classList.add(\"flex\")\n        btnClose.classList.add(\"hidden\")\n        btnClose.classList.remove(\"flex\")\n        menu.classList.remove('flex')     \n        menu.classList.add(\"hidden\")\n    });\n\n\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/menu.js?");

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