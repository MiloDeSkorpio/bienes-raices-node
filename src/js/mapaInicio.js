(function () {
  const latIn = 21.110110000000077;
  const lngIn = -101.67689999999999;
  const mapa = L.map('mapa-inicio').setView([latIn, lngIn], 4);

  let markers = new L.FeatureGroup().addTo(mapa)
  //crear arreglos para guardar los datos de las apis
  let propiedades = [];
  let estados = [];
  let municipios = [];
  //Filtros
  const filtros = {
    categoria: '',
    tipo: '',
    estado: '',
    municipio: '',
    publicada: 1
  }
  //hide&show filtros
  const btnDown = document.querySelector('#iconDown')
  const btnUp = document.querySelector('#iconUp')
  const filters = document.querySelector('#selects')
  
    btnDown.addEventListener('click' , function () {
      btnDown.classList.add('hidden')
      btnUp.classList.remove('hidden')
      filters.classList.remove('hidden')
    });
    
    btnDown.addEventListener('click' , function () {
      btnDown.classList.add('hidden')
      btnUp.classList.remove('hidden')
      filters.classList.remove('hidden')
    });
    btnUp.addEventListener('click' , function () {
      btnUp.classList.add('hidden')
      btnDown.classList.remove('hidden')
      filters.classList.add('hidden')
    });
    
  //Obtener las referencias
  const categoriaSelect = document.querySelector('#categorias');
  const tipoSelect = document.querySelector('#tipoTr');
  const estadoSelect = document.querySelector('#estados');
  const municipioSelect = document.querySelector('#municipios');
  // Deshabilitar el select de municipio al cargar la página
  municipioSelect.disabled = true;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  //Filtrado de Categorias y tipos
  categoriaSelect.addEventListener('change', e => {
    filtros.categoria = +e.target.value
    filtrarPropiedades();
  })
  tipoSelect.addEventListener('change', e => {
    filtros.tipo = +e.target.value
    filtrarPropiedades();
  })
  estadoSelect.addEventListener('change', e => {
    filtros.estado = +e.target.value
    municipioSelect.disabled = estadoSelect.value === '';
    const estadoSeleccionado = estados.find(estado => estado.id === filtros.estado);
    // Filtrar los municipios según el estado seleccionado
    const municipiosFiltrados = municipios.filter((municipio) => municipio.estadoId === estadoSeleccionado.id);
    // Generar el HTML para las opciones del select de municipios
    const municipiosHTML = municipiosFiltrados.map((municipio) => `<option value="${municipio.id}">${municipio.nombre}</option>`);
    // Establecer las opciones del select de municipios
    municipioSelect.innerHTML = `<option value="">- Seleccione -</option>${municipiosHTML.join('')}`;
    // Habilitar el select de municipios
    console.log(estadoSeleccionado)

    console.log(municipiosFiltrados)
    if (estadoSeleccionado) {
      const { lat, lng, zoom } = estadoSeleccionado;
      mapa.setView([lat, lng], zoom);
    } else {
      mapa.setView([latIn, lngIn], 4);
    }

    filtrarPropiedades();
  })
  municipioSelect.addEventListener('change', e => {
    filtros.municipio = +e.target.value
    const municipioSeleccionado = municipios.find(municipio => municipio.id === filtros.municipio);
    console.log(municipioSeleccionado)
    if (municipioSeleccionado) {
      const { lat, lng, zoom } = municipioSeleccionado;
      mapa.setView([lat, lng], zoom);
    } else {
      mapa.setView([latIn, lngIn], 4)
    }
    filtrarPropiedades();
  })

  //crear api propiedades
  const obtenerPropiedades = async () => {
    try {
      const url = '/api/propiedades'
      const respuesta = await fetch(url)
      propiedades = await respuesta.json()
      const propiedadesPublicadas = propiedades.filter(propiedad => propiedad.publicado === true);
      mostrarPropiedades(propiedadesPublicadas);
    } catch (error) {
      console.log(error)
    }
  }
  //crear api estados
  const obtenerEstados = async () => {
    try {
      const url = 'api/estados'
      const respuesta = await fetch(url)
      estados = await respuesta.json()
    } catch {
      console.log(error)
    }
  }
  //crear api municipios
  const obtenerMunicipios = async () => {
    try {
      const url = '/api/municipios'
      const respuesta = await fetch(url)
      municipios = await respuesta.json()
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarPropiedades = propiedades => {

    //Limpiar los markers previos
    markers.clearLayers()

    propiedades.forEach(propiedad => {
      //Agregar los Pines
      const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
        autoPan: true
      })
        .addTo(mapa)
        .bindPopup(`
        <p class="text-dkgray-700 font-bold">${propiedad?.categoria.nombre}</p>
        <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>
        <div class="max-w-xs mx-auto">
        <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la Propiedad ${propiedad?.titulo}" class="w-full h-48 object-cover">
        </div>
        <p class="text-gray-600 font-bold">${propiedad?.precio.nombre}</p>
        <a href="/propiedad/${propiedad?.id}" class="bg-dkblue-600 block p-2 text-center text-white font-bold uppercase">Ver Propiedad</a>
        `)

      markers.addLayer(marker)
    });
  }

  const filtrarPropiedades = () => {
    const resultado = propiedades.filter(filtrarCategoria).filter(filtrarTipo).filter(filtrarMunicipio).filter(filtrarEstado)
    mostrarPropiedades(resultado)
  }
  //const filtrarPublicadas = propiedad => filtros.publicada ? propiedad.publicado === filtros.publicada : propiedad
  const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad
  const filtrarTipo = propiedad => filtros.tipo ? propiedad.tipoId === filtros.tipo : propiedad
  const filtrarEstado = propiedad => filtros.estado ? propiedad.estadoId === filtros.estado : propiedad;
  const filtrarMunicipio = propiedad => filtros.municipio ? propiedad.municipioId === filtros.municipio : propiedad;
  obtenerPropiedades()
  obtenerEstados()
  obtenerMunicipios()
})()