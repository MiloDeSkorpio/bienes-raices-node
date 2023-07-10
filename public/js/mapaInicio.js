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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\r\n  const lat =  21.110110000000077;\r\n  const lng = -101.67689999999999;\r\n  const mapa = L.map('mapa-inicio').setView([lat, lng ], 4);\r\n\r\n  let markers = new L.FeatureGroup().addTo(mapa)\r\n  let propiedades = [];\r\n  //Filtros\r\n  const filtros = {\r\n    categoria: '',\r\n    tipo: '',\r\n    estado: '',\r\n    municipio: ''\r\n  }\r\n\r\n  //Obtener las referencias\r\n  const categoriaSelect = document.querySelector('#categorias');\r\n  const tipoSelect = document.querySelector('#tipoTr');\r\n  const estadoSelect = document.querySelector('#estados')\r\n  const municipioSelect = document.querySelector('#municipios')\r\n// Deshabilitar el select de municipio al cargar la página\r\n  municipioSelect.disabled = true;\r\n\r\n  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n  }).addTo(mapa);\r\n\r\n  //Filtrado de Categorias y tipos\r\n\r\n  categoriaSelect.addEventListener('change', e =>{\r\n    filtros.categoria = +e.target.value\r\n   \r\n    filtrarPropiedades();\r\n  })\r\n  tipoSelect.addEventListener('change', e =>{\r\n    filtros.tipo = +e.target.value\r\n\r\n    filtrarPropiedades();\r\n  })\r\n  estadoSelect.addEventListener('change', e =>{\r\n    filtros.estado = +e.target.value\r\n    municipioSelect.disabled = estadoSelect.value === '';\r\n    filtrarPropiedades();\r\n  })\r\n  municipioSelect.addEventListener('change', e =>{\r\n    filtros.municipio = e.target.value\r\n\r\n    filtrarPropiedades();\r\n  })\r\n\r\n\r\n  const obtenerPropiedades = async () => {\r\n    try {\r\n      const url = '/api/propiedades'\r\n      const respuesta = await fetch(url)\r\n      propiedades = await respuesta.json()\r\n      mostrarPropiedades(propiedades)\r\n    } catch (error) {\r\n      console.log(error)\r\n    }\r\n  }\r\n\r\n  const mostrarPropiedades = propiedades => {\r\n\r\n    //Limpiar los markers previos\r\n    markers.clearLayers()\r\n\r\n    propiedades.forEach(propiedad => {\r\n      //Agregar los Pines\r\n      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {\r\n        autoPan:true\r\n      })\r\n      .addTo(mapa)\r\n      .bindPopup(`\r\n        <p class=\"text-indigo-600 font-bold\">${propiedad?.categoria.nombre}</p>\r\n        <h1 class=\"text-xl font-extrabold uppercase my-2\">${propiedad?.titulo}</h1>\r\n        <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la Propiedad ${propiedad?.titulo}\">\r\n        <p class=\"text-gray-600 font-bold\">${propiedad?.precio.nombre}</p>\r\n        <a href=\"/propiedad/${propiedad?.id}\" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase\">Ver Propiedad</a>\r\n        `)\r\n\r\n      markers.addLayer(marker)\r\n    });\r\n  }\r\n\r\n  const filtrarPropiedades = () => {\r\n    const resultado = propiedades.filter( filtrarCategoria ).filter( filtrartipo ).filter( filtrarMunicipio ).filter( filtrarEstado )\r\n    mostrarPropiedades(resultado)\r\n    \r\n  }\r\n\r\n  const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad\r\n  const filtrartipo = propiedad => filtros.tipo ? propiedad.tipoId === filtros.tipo : propiedad\r\n  const filtrarMunicipio = propiedad => filtros.municipio ? propiedad.municipio === filtros.municipio : propiedad;\r\n  const filtrarEstado = propiedad => filtros.estado ? propiedad.estadoId === filtros.estado : propiedad;\r\n  obtenerPropiedades()\r\n})()\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapaInicio.js?");

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
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;