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

/***/ "./src/js/configMP.js":
/*!****************************!*\
  !*** ./src/js/configMP.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\r\n  mercadoPagoPublicKey: 'TEST-b4124118-4007-456c-851e-5a0a8bb445a0',\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/configMP.js?");

/***/ }),

/***/ "./src/js/mercadoPago.js":
/*!*******************************!*\
  !*** ./src/js/mercadoPago.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _configMP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configMP.js */ \"./src/js/configMP.js\");\n\r\n\r\n// Add SDK credentials\r\n// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel\r\nconst mercadopago = new MercadoPago(_configMP_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mercadoPagoPublicKey, {\r\n  locale: 'es-MX' // The most common are: 'pt-BR', 'es-AR' and 'en-US'\r\n});\r\n\r\n// Handle call to backend and generate preference.\r\ndocument.getElementById(\"checkout-btn\").addEventListener(\"click\", function () {\r\n  console.log('desde el btn de cobrar')\r\n  $('#checkout-btn').attr(\"disabled\", true);\r\n\r\n  const orderData = {\r\n    quantity: document.getElementById(\"quantity\").value,\r\n    description: document.getElementById(\"product-description\").innerHTML,\r\n    price: document.getElementById(\"unit-price\").innerHTML\r\n  };\r\n\r\n  fetch(\"http://localhost:8080/create_preference\", {\r\n    method: \"POST\",\r\n    headers: {\r\n      \"Content-Type\": \"application/json\",\r\n    },\r\n    body: JSON.stringify(orderData),\r\n  })\r\n    .then(function (response) {\r\n      return response.json();\r\n    })\r\n    .then(function (preference) {\r\n      createCheckoutButton(preference.id);\r\n\r\n      $(\".shopping-cart\").fadeOut(500);\r\n      setTimeout(() => {\r\n        $(\".container_payment\").show(500).fadeIn();\r\n      }, 500);\r\n    })\r\n    .catch(function () {\r\n      alert(\"Unexpected error\");\r\n      $('#checkout-btn').attr(\"disabled\", false);\r\n    });\r\n});\r\n\r\nfunction createCheckoutButton(preferenceId) {\r\n  // Initialize the checkout\r\n  const bricksBuilder = mercadopago.bricks();\r\n\r\n  const renderComponent = async (bricksBuilder) => {\r\n    if (window.checkoutButton) window.checkoutButton.unmount();\r\n    await bricksBuilder.create(\r\n      'wallet',\r\n      'button-checkout', // class/id where the payment button will be displayed\r\n      {\r\n        initialization: {\r\n          preferenceId: preferenceId\r\n        },\r\n        callbacks: {\r\n          onError: (error) => console.error(error),\r\n          onReady: () => {}\r\n        }\r\n      }\r\n    );\r\n  };\r\n  window.checkoutButton =  renderComponent(bricksBuilder);\r\n}\r\n\r\n// Handle price update\r\nfunction updatePrice() {\r\n  let quantity = document.getElementById(\"quantity\").value;\r\n  let unitPrice = document.getElementById(\"unit-price\").innerHTML;\r\n  let amount = parseInt(unitPrice) * parseInt(quantity);\r\n\r\n  document.getElementById(\"cart-total\").innerHTML = \"$ \" + amount;\r\n  document.getElementById(\"summary-price\").innerHTML = \"$ \" + unitPrice;\r\n  document.getElementById(\"summary-quantity\").innerHTML = quantity;\r\n  document.getElementById(\"summary-total\").innerHTML = \"$ \" + amount;\r\n}\r\n\r\ndocument.getElementById(\"quantity\").addEventListener(\"change\", updatePrice);\r\nupdatePrice();\r\n\r\n// Go back\r\ndocument.getElementById(\"go-back\").addEventListener(\"click\", function () {\r\n  $(\".container_payment\").fadeOut(500);\r\n  setTimeout(() => {\r\n    $(\".shopping-cart\").show(500).fadeIn();\r\n  }, 500);\r\n  $('#checkout-btn').attr(\"disabled\", false);\r\n});\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mercadoPago.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/mercadoPago.js");
/******/ 	
/******/ })()
;