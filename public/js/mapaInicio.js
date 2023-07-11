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

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\n  const latIn = 21.110110000000077;\n  const lngIn = -101.67689999999999;\n  const mapa = L.map('mapa-inicio').setView([latIn, lngIn], 4);\n\n  let markers = new L.FeatureGroup().addTo(mapa)\n  //crear arreglos para guardar los datos de las apis\n  let propiedades = [];\n  let estados = [];\n  let municipios = [];\n  //Filtros\n  const filtros = {\n    categoria: '',\n    tipo: '',\n    estado: '',\n    municipio: ''\n  }\n\n  //Obtener las referencias\n  const categoriaSelect = document.querySelector('#categorias');\n  const tipoSelect = document.querySelector('#tipoTr');\n  const estadoSelect = document.querySelector('#estados');\n  const municipioSelect = document.querySelector('#municipios');\n  // Deshabilitar el select de municipio al cargar la página\n  municipioSelect.disabled = true;\n\n  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n    attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n  }).addTo(mapa);\n\n  //Filtrado de Categorias y tipos\n  categoriaSelect.addEventListener('change', e => {\n    filtros.categoria = +e.target.value\n    filtrarPropiedades();\n  })\n  tipoSelect.addEventListener('change', e => {\n    filtros.tipo = +e.target.value\n    filtrarPropiedades();\n  })\n  estadoSelect.addEventListener('change', e => {\n    filtros.estado = +e.target.value\n    municipioSelect.disabled = estadoSelect.value === '';\n    const estadoSeleccionado = estados.find(estado => estado.id === filtros.estado);\n    // Filtrar los municipios según el estado seleccionado\n    const municipiosFiltrados = municipios.filter((municipio) => municipio.estadoId === estadoSeleccionado.id);\n    // Generar el HTML para las opciones del select de municipios\n    const municipiosHTML = municipiosFiltrados.map((municipio) => `<option value=\"${municipio.id}\">${municipio.nombre}</option>`);\n    // Establecer las opciones del select de municipios\n    municipioSelect.innerHTML = `<option value=\"\">- Seleccione -</option>${municipiosHTML.join('')}`;\n    // Habilitar el select de municipios\n    console.log(estadoSeleccionado)\n\n    console.log(municipiosFiltrados)\n    if (estadoSeleccionado) {\n      const { lat, lng, zoom } = estadoSeleccionado;\n      mapa.setView([lat, lng], zoom);\n    } else {\n      mapa.setView([latIn, lngIn], 4);\n    }\n\n    filtrarPropiedades();\n  })\n  municipioSelect.addEventListener('change', e => {\n    filtros.municipio = +e.target.value\n    const municipioSeleccionado = municipios.find(municipio => municipio.id === filtros.municipio);\n    console.log(municipioSeleccionado)\n    if (municipioSeleccionado) {\n      const { lat, lng, zoom } = municipioSeleccionado;\n      mapa.setView([lat, lng], zoom);\n    } else {\n      mapa.setView([latIn, lngIn], 4)\n    }\n    filtrarPropiedades();\n  })\n\n  //crear api propiedades\n  const obtenerPropiedades = async () => {\n    try {\n      const url = '/api/propiedades'\n      const respuesta = await fetch(url)\n      propiedades = await respuesta.json()\n      mostrarPropiedades(propiedades)\n    } catch (error) {\n      console.log(error)\n    }\n  }\n  //crear api estados\n  const obtenerEstados = async () => {\n    try {\n      const url = 'api/estados'\n      const respuesta = await fetch(url)\n      estados = await respuesta.json()\n    } catch {\n      console.log(error)\n    }\n  }\n  //crear api municipios\n  const obtenerMunicipios = async () => {\n    try {\n      const url = '/api/municipios'\n      const respuesta = await fetch(url)\n      municipios = await respuesta.json()\n    } catch (error) {\n      console.log(error)\n    }\n  }\n\n  const mostrarPropiedades = propiedades => {\n\n    //Limpiar los markers previos\n    markers.clearLayers()\n\n    propiedades.forEach(propiedad => {\n      //Agregar los Pines\n      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {\n        autoPan: true\n      })\n        .addTo(mapa)\n        .bindPopup(`\n        <p class=\"text-dkgray-700 font-bold\">${propiedad?.categoria.nombre}</p>\n        <h1 class=\"text-xl font-extrabold uppercase my-2\">${propiedad?.titulo}</h1>\n        <div class=\"max-w-xs mx-auto\">\n        <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la Propiedad ${propiedad?.titulo}\" class=\"w-full h-48 object-cover\">\n        </div>\n        <p class=\"text-gray-600 font-bold\">${propiedad?.precio.nombre}</p>\n        <a href=\"/propiedad/${propiedad?.id}\" class=\"bg-dkblue-600 block p-2 text-center text-white font-bold uppercase\">Ver Propiedad</a>\n        `)\n\n      markers.addLayer(marker)\n    });\n  }\n\n  const filtrarPropiedades = () => {\n    const resultado = propiedades.filter(filtrarCategoria).filter(filtrarTipo).filter(filtrarMunicipio).filter(filtrarEstado)\n    mostrarPropiedades(resultado)\n  }\n\n  const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad\n  const filtrarTipo = propiedad => filtros.tipo ? propiedad.tipoId === filtros.tipo : propiedad\n  const filtrarEstado = propiedad => filtros.estado ? propiedad.estadoId === filtros.estado : propiedad;\n  const filtrarMunicipio = propiedad => filtros.municipio ? propiedad.municipioId === filtros.municipio : propiedad;\n  obtenerPropiedades()\n  obtenerEstados()\n  obtenerMunicipios()\n})()\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapaInicio.js?");

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