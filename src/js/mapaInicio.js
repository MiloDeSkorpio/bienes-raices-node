(function(){
  const lat =  19.3907336;
  const lng = -99.1436127;
  const mapa = L.map('mapa-inicio').setView([lat, lng ], 5.5);

  let markers = new L.FeatureGroup().addTo(mapa)
  let propiedades = [];
  //Filtros
  const filtros = {
    categoria: '',
    tipo: '',
    estado: '',
    municipio: ''
  }

  const categoriaSelect = document.querySelector('#categorias');
  const tipoSelect = document.querySelector('#tipoTr');
  const estadoSelect = document.querySelector('#estados')
  const municipioSelect = document.querySelector('#municipios')

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapa);

  //Filtrado de Categorias y tipos

  categoriaSelect.addEventListener('change', e =>{
    filtros.categoria = +e.target.value
    console.log(filtros.categoria)
    filtrarPropiedades();
  })
  tipoSelect.addEventListener('change', e =>{
    filtros.tipo = +e.target.value
    console.log(filtros.tipo)
    filtrarPropiedades();
  })
  estadoSelect.addEventListener('change', e =>{
    filtros.estado = e.target.value
    console.log(filtros.estado)
    filtrarPropiedades();
  })
  municipioSelect.addEventListener('change', e =>{
    filtros.municipio = e.target.value
    console.log(filtros.municipio)
    filtrarPropiedades();
  })


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
    const resultado = propiedades.filter( filtrarCategoria ).filter( filtrartipo ).filter( filtrarMunicipio ).filter( filtrarEstado )
    mostrarPropiedades(resultado)
    
  }

  const filtrarCategoria = propiedad => filtros.categoria ? propiedad.categoriaId === filtros.categoria : propiedad
  const filtrartipo = propiedad => filtros.tipo ? propiedad.tipoId === filtros.tipo : propiedad
  const filtrarMunicipio = propiedad => filtros.municipio ? propiedad.municipio === filtros.municipio : propiedad;
  const filtrarEstado = propiedad => filtros.estado ? propiedad.estado === filtros.estado : propiedad;
  obtenerPropiedades()
})()