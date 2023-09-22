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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\r\n  mercadoPagoPublicKey: 'TEST-b4124118-4007-456c-851e-5a0a8bb445a0',\r\n  url: 'http://localhost:3000'\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/configMP.js?");

/***/ }),

/***/ "./src/js/mercadoPago.js":
/*!*******************************!*\
  !*** ./src/js/mercadoPago.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _configMP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configMP.js */ \"./src/js/configMP.js\");\n\n// Add SDK credentials\n// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel\nconst mercadopago = new MercadoPago(_configMP_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mercadoPagoPublicKey, {\n  locale: 'es-MX' // The most common are: 'pt-BR', 'es-AR' and 'en-US'\n});\n\n// Handle call to backend and generate preference.\ndocument.getElementById(\"checkout-btn\").addEventListener(\"click\", function () {\n\n  $('#checkout-btn').attr(\"disabled\", true);\n\n  const orderData = {\n    quantity: document.getElementById(\"quantity\").value,\n    description: document.getElementById(\"product-description\").innerHTML,\n    price: document.getElementById(\"unit-price\").innerHTML\n  };\n\n  fetch(\"/adm/create_preference\", {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n    },\n    body: JSON.stringify(orderData),\n  })\n    .then(function (response) {\n      return response.json();\n    })\n    .then(function (preference) {\n      createCheckoutButton(preference.id);\n\n      $(\".shopping-cart\").fadeOut(500);\n      setTimeout(() => {\n        $(\".container_payment\").show(500).fadeIn();\n      }, 500);\n    })\n    .catch(function () {\n      alert(\"Unexpected error\");\n      $('#checkout-btn').attr(\"disabled\", false);\n    });\n});\n\nfunction createCheckoutButton(preferenceId) {\n  // Initialize the checkout\n  const bricksBuilder = mercadopago.bricks();\n\n  const renderComponent = async (bricksBuilder) => {\n    if (window.checkoutButton) window.checkoutButton.unmount();\n    await bricksBuilder.create(\n      'wallet',\n      'button-checkout', // class/id where the payment button will be displayed\n      {\n        initialization: {\n          preferenceId: preferenceId\n        },\n        callbacks: {\n          onError: (error) => console.error(error),\n          onReady: () => {}\n        }\n      }\n    );\n  };\n  window.checkoutButton =  renderComponent(bricksBuilder);\n}\n\n// Handle price update\nfunction updatePrice() {\n  let quantity = document.getElementById(\"quantity\").value;\n  let unitPrice = document.getElementById(\"unit-price\").innerHTML;\n  let amount = parseInt(unitPrice) * parseInt(quantity);\n\n  document.getElementById(\"cart-total\").innerHTML = \"$ \" + amount;\n  document.getElementById(\"summary-price\").innerHTML = \"$ \" + unitPrice;\n  document.getElementById(\"summary-quantity\").innerHTML = quantity;\n  document.getElementById(\"summary-total\").innerHTML = \"$ \" + amount;\n}\n\ndocument.getElementById(\"quantity\").addEventListener(\"change\", updatePrice);\nupdatePrice();\n\n// Go back\ndocument.getElementById(\"go-back\").addEventListener(\"click\", function () {\n  $(\".container_payment\").fadeOut(500);\n  setTimeout(() => {\n    $(\".shopping-cart\").show(500).fadeIn();\n  }, 500);\n  $('#checkout-btn').attr(\"disabled\", false);\n});\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mercadoPago.js?");

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