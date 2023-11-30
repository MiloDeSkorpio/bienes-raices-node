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

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n  const latIn = 21.110110000000077;\r\n  const lngIn = -101.67689999999999;\r\n  const mapa = L.map('mapa-inicio').setView([latIn, lngIn], 4);\r\n\r\n  let markers = new L.FeatureGroup().addTo(mapa)\r\n  //crear arreglos para guardar los datos de las apis\r\n  let propiedades = [];\r\n  let estados = [];\r\n  let municipios = [];\r\n  //Filtros\r\n  const filtros = {\r\n    categoria: '',\r\n    tipo: '',\r\n    estado: '',\r\n    municipio: '',\r\n    publicada: 1\r\n  }\r\n  //hide&show filtros\r\n  const btnDown = document.querySelector('#iconDown')\r\n  const btnUp = document.querySelector('#iconUp')\r\n  const filters = document.querySelector('#selects')\r\n  \r\n    btnDown.addEventListener('click' , function () {\r\n      btnDown.classList.add('hidden')\r\n      btnUp.classList.remove('hidden')\r\n      filters.classList.remove('hidden')\r\n    });\r\n    \r\n    btnDown.addEventListener('click' , function () {\r\n      btnDown.classList.add('hidden')\r\n      btnUp.classList.remove('hidden')\r\n      filters.classList.remove('hidden')\r\n    });\r\n    btnUp.addEventListener('click' , function () {\r\n      btnUp.classList.add('hidden')\r\n      btnDown.classList.remove('hidden')\r\n      filters.classList.add('hidden')\r\n    });\r\n    \r\n  //Obtener las referencias\r\n  const categoriaSelect = document.querySelector('#categorias');\r\n  const tipoSelect = document.querySelector('#tipoTr');\r\n  const estadoSelect = document.querySelector('#estados');\r\n  const municipioSelect = document.querySelector('#municipios');\r\n  // Deshabilitar el select de municipio al cargar la página\r\n  municipioSelect.disabled = true;\r\n\r\n  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n    attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n  }).addTo(mapa);\r\n\r\n  //Filtrado de Categorias y tipos\r\n  categoriaSelect.addEventListener('change', e => {\r\n    filtros.categoria = +e.target.value\r\n    filtrarPropiedades();\r\n  })\r\n  tipoSelect.addEventListener('change', e => {\r\n    filtros.tipo = +e.target.value\r\n    filtrarPropiedades();\r\n  })\r\n  estadoSelect.addEventListener('change', e => {\r\n    filtros.estado = +e.target.value\r\n    municipioSelect.disabled = estadoSelect.value === '';\r\n    const estadoSeleccionado = estados.find(estado => estado.id === filtros.estado);\r\n    // Filtrar los municipios según el estado seleccionado\r\n    const municipiosFiltrados = municipios.filter((municipio) => municipio.estadoId === estadoSeleccionado.id);\r\n    // Generar el HTML para las opciones del select de municipios\r\n    const municipiosHTML = municipiosFiltrados.map((municipio) => `<option value=\"${municipio.id}\">${municipio.nombre}</option>`);\r\n    // Establecer las opciones del select de municipios\r\n    municipioSelect.innerHTML = `<option value=\"\">- Seleccione -</option>${municipiosHTML.join('')}`;\r\n    // Habilitar el select de municipios\r\n    console.log(estadoSeleccionado)\r\n\r\n    console.log(municipiosFiltrados)\r\n    if (estadoSeleccionado) {\r\n      const { lat, lng, zoom } = estadoSeleccionado;\r\n      mapa.setView([lat, lng], zoom);\r\n    } else {\r\n      mapa.setView([latIn, lngIn], 4);\r\n    }\r\n\r\n    filtrarPropiedades();\r\n  })\r\n  municipioSelect.addEventListener('change', e => {\r\n    filtros.municipio = +e.target.value\r\n    const municipioSeleccionado = municipios.find(municipio => municipio.id === filtros.municipio);\r\n    console.log(municipioSeleccionado)\r\n    if (municipioSeleccionado) {\r\n      const { lat, lng, zoom } = municipioSeleccionado;\r\n      mapa.setView([lat, lng], zoom);\r\n    } else {\r\n      mapa.setView([latIn, lngIn], 4)\r\n    }\r\n    filtrarPropiedades();\r\n  })\r\n\r\n  //crear api propiedades\r\n  const obtenerPropiedades = async () => {\r\n    try {\r\n      const url = '/api/propiedades'\r\n      const respuesta = await fetch(url)\r\n      propiedades = await respuesta.json()\r\n      const propiedadesPublicadas = propiedades.filter(propiedad => propiedad.publicado === true);\r\n      mostrarPropiedades(propiedadesPublicadas);\r\n    } catch (error) {\r\n      console.log(error)\r\n    }\r\n  }\r\n  //crear api estados\r\n  const obtenerEstados = async () => {\r\n    try {\r\n      const url = 'api/estados'\r\n      const respuesta = await fetch(url)\r\n      estados = await respuesta.json()\r\n    } catch {\r\n      console.log(error)\r\n    }\r\n  }\r\n  //crear api municipios\r\n  const obtenerMunicipios = async () => {\r\n    try {\r\n      const url = '/api/municipios'\r\n      const respuesta = await fetch(url)\r\n      municipios = await respuesta.json()\r\n    } catch (error) {\r\n      console.log(error)\r\n    }\r\n  }\r\n\r\n  const mostrarPropiedades = propiedades => {\r\n\r\n    //Limpiar los markers previos\r\n    markers.clearLayers()\r\n\r\n    propiedades.forEach(propiedad => {\r\n      //Agregar los Pines\r\n      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {\r\n        autoPan: true\r\n      })\r\n        .addTo(mapa)\r\n        .bindPopup(`\r\n        <p class=\"text-dkgray-700 font-bold\">${propiedad?.categoria.nombre}</p>\r\n        <h1 class=\"text-xl font-extrabold uppercase my-2\">${propiedad?.titulo}</h1>\r\n        <div class=\"max-w-xs mx-auto\">\r\n        <img src=\"/uploads/${propiedad?.imagen}\" alt=\"Imagen de la Propiedad ${propiedad?.titulo}\" class=\"w-full h-48 object-cover\">\r\n        </div>\r\n        <p class=\"text-gray-600 font-bold\">${propiedad?.precio.nombre}</p>\r\n        <a href=\"/propiedad/${propiedad?.id}\" class=\"bg-dkblue-600 block p-2 text-center text-white font-bold uppercase\">Ver Propiedad</a>\r\n        `)\r\n\r\n      markers.addLayer(marker)\r\n    });\r\n  }\r\n\r\n  const filtrarPropiedades = () => {\r\n    const resultado = propiedades.filter(filtrarCategoria).filter(filtrarTipo).filter(filtrarMunicipio).filter(filtrarEstado)\r\n    mostrarPropiedades(resultado)\r\n  }\r\n  //const filtrarPublicadas = propiedad => filtros.publicada ? propiedad.publicado === filtros.publicada : propiedad\r\n  const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad\r\n  const filtrarTipo = propiedad => filtros.tipo ? propiedad.tipoId === filtros.tipo : propiedad\r\n  const filtrarEstado = propiedad => filtros.estado ? propiedad.estadoId === filtros.estado : propiedad;\r\n  const filtrarMunicipio = propiedad => filtros.municipio ? propiedad.municipioId === filtros.municipio : propiedad;\r\n  obtenerPropiedades()\r\n  obtenerEstados()\r\n  obtenerMunicipios()\r\n})()\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapaInicio.js?");

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