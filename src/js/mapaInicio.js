(function(){
  const latIn =  21.110110000000077;
  const lngIn = -101.67689999999999;
  const mapa = L.map('mapa-inicio').setView([latIn, lngIn ], 4);

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
    municipio: ''
  }

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
  categoriaSelect.addEventListener('change', e =>{
    filtros.categoria = +e.target.value 
    filtrarPropiedades();
  })
  tipoSelect.addEventListener('change', e =>{
    filtros.tipo = +e.target.value
    filtrarPropiedades();
  })
  estadoSelect.addEventListener('change', e =>{
    filtros.estado = +e.target.value
    municipioSelect.disabled = estadoSelect.value === '';
    const estadoSeleccionado = estados.find(estado => estado.id === filtros.estado);
    if (estadoSeleccionado) {
      const { lat, lng, zoom } = estadoSeleccionado;
      mapa.setView([lat, lng], zoom);
    } else {
      mapa.setView([latIn, lngIn], 4);
    }
    filtrarPropiedades();
  })
  municipioSelect.addEventListener('change', e =>{
    filtros.municipio = +e.target.value
    const municipioSeleccionado = municipios.find(municipio => municipio.id === filtros.municipio);
    if(municipioSeleccionado){
      const {lat, lng, zoom } = municipioSeleccionado;
      mapa.setView([lat, lng], zoom);
    } else {
      mapa.setView([latIn, lngIn],4)
    }
    filtrarPropiedades();
  })

//crear api propiedades
  const obtenerPropiedades = async () => {
    try {
      const url = '/api/propiedades'
      const respuesta = await fetch(url)
      propiedades = await respuesta.json()
      mostrarPropiedades(propiedades)
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
        autoPan:true
      })
      .addTo(mapa)
      .bindPopup(`
        <p class="text-indigo-600 font-bold">${propiedad?.categoria.nombre}</p>
        <h1 class="text-xl font-extrabold uppercase my-2">${propiedad?.titulo}</h1>
        <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la Propiedad ${propiedad?.titulo}">
        <p class="text-gray-600 font-bold">${propiedad?.precio.nombre}</p>
        <a href="/propiedad/${propiedad?.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver Propiedad</a>
        `)

      markers.addLayer(marker)
    });
  }

  const filtrarPropiedades = () => {
    const resultado = propiedades.filter( filtrarCategoria ).filter( filtrarTipo ).filter( filtrarMunicipio ).filter( filtrarEstado )
    mostrarPropiedades(resultado)
  }

  const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad
  const filtrarTipo = propiedad => filtros.tipo ? propiedad.tipoId === filtros.tipo : propiedad
  const filtrarEstado = propiedad => filtros.estado ? propiedad.estadoId === filtros.estado : propiedad;
  const filtrarMunicipio = propiedad => filtros.municipio ? propiedad.municipioId === filtros.municipio : propiedad;
  obtenerPropiedades()
  obtenerEstados()
  obtenerMunicipios()
})()