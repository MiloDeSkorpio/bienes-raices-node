const propiedades = [
  {
    titulo: 'Casa en el Lago',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Jazmín',
    lat: 19.78355328981482,
    lng: -99.1009488918668,
    imagen: 'anuncio1.jpg',
    publicado: 1,
    precioId: 2,
    categoriaId: 1,
    usuarioId: 1,
    verificado: 1,
    estado: 'México',
    municipio: 'Zumpango'
  },
  {
    titulo: 'Casa en la playa',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Tio Mon',
    lat: 18.928071183206814,
    lng: -104.08186611325726,
    imagen: 'anuncio2.jpg',
    publicado: 1,
    precioId: 3,
    categoriaId: 1,
    usuarioId: 1,
    verificado: 1,
    estado: 'Veracruz de Ignacio de la Llave',
    municipio: 'Alto Lucero de Gutiérrez Barrios'
  },
  {
    titulo: 'Casa con alberca',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Cerrada Príncipe Otomí 3',
    lat: 19.212360680004103,
    lng: -96.2175452751924,
    imagen: 'anuncio3.jpg',
    publicado: 1,
    precioId: 5,
    categoriaId: 1,
    usuarioId: 1,
    verificado: 0,
    estado: 'Hidalgo',
    municipio: 'Ixmiquilpan'
  },
  {
    titulo: 'Casa con Garage',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Hacienda Los Arrayanes',
    lat: 22.220312200919967,
    lng: -100.9808174533947,
    imagen: 'anuncio4.jpg',
    publicado: 1,
    precioId: 2,
    categoriaId: 1,
    usuarioId: 1,
    verificado: 1,
    estado: 'Querétaro',
    municipio: 'San Juan del Río'
  },
  {
    titulo: 'Casa Residencial',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Boulevard Mariano Escobedo 125',
    lat: 20.0921221209996,
    lng: -98.78355264735393,
    imagen: 'anuncio5.jpg',
    publicado: 1,
    precioId: 3,
    categoriaId: 1,
    usuarioId: 1,
    verificado: 0,
    estado: 'Guanajuato',
    municipio: 'León'
  },
  {
    titulo: 'Casa Cerca de  la playa',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Palmar de los Cocos',
    lat: 20.652889611068012,
    lng: -87.05544621506667,
    imagen: 'anuncio6.jpg',
    publicado: 1,
    precioId: 3,
    categoriaId: 1,
    usuarioId: 2,
    verificado: 1,
    estado: 'Nayarit',
    municipio: 'San Blas'
  },
  {
    titulo: 'Casa lujosa con piscina',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Andador Vicente Guerrero',
    lat: 18.98546498481736,
    lng: -98.19033688228721,
    imagen: 'anuncio7.jpg',
    publicado: 1,
    precioId: 4,
    categoriaId: 1,
    usuarioId: 2,
    verificado: 0,
    estado: 'Guerrero',
    municipio: 'Chilpancingo de los Bravo'
  },
  {
    titulo: 'Departamento de lujo',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle José María Arteaga Oriente 2301',
    lat: 25.656396449754826,
    lng: -100.30523347170218,
    imagen: 'anuncio8.jpg',
    publicado: 1,
    precioId: 6,
    categoriaId: 2,
    usuarioId: 2,
    verificado: 1,
    estado: 'Nuevo León',
    municipio: 'Monterrey'
  },
  {
    titulo: 'Casa minimalista con piscina',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Manuel Ávila Camacho',
    lat: 24.748605098158517,
    lng: -107.41018359120747,
    imagen: 'anuncio9.jpg',
    publicado: 1,
    precioId: 4,
    categoriaId: 1,
    usuarioId: 2,
    verificado: 0,
    estado: 'Tamaulipas',
    municipio: 'Nuevo Laredo'
  },
  {
    titulo: 'Lujosa Casa',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Privada La Junta 7351',
    lat: 25.03215956686322,
    lng: -111.66231304925725,
    imagen: 'anuncio10.jpg',
    publicado: 1,
    precioId: 3,
    categoriaId: 1,
    usuarioId: 2,
    verificado: 1,
    estado: 'Chihuahua',
    municipio: 'Juárez'
  },
  {
    titulo: 'Bonita Casa de Campo',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Carretera a Mauro Angulo',
    lat: 21.85829624187302,
    lng: -102.38341109105477,
    imagen: 'anuncio11.jpg',
    publicado: 1,
    precioId: 6,
    categoriaId: 1,
    usuarioId: 3,
    verificado: 0,
    estado: 'Tlaxcala',
    municipio: 'Huamantla'
  },
  {
    titulo: 'Departamento de lujo',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Doctor Aubanel Vallejo 4614',
    lat: 31.253888556505593,
    lng: -110.96453422160822,
    imagen: 'anuncio12.jpg',
    publicado: 1,
    precioId: 6,
    categoriaId: 2,
    usuarioId: 3,
    verificado: 1,
    estado: 'Baja California',
    municipio: 'Tijuana'
  },
  {
    titulo: 'Bonito Departamento',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Boulevard General Agustín Olachea Avilés',
    lat: 30.408489983719065,
    lng: -107.92146004173972,
    imagen: 'anuncio13.jpg',
    publicado: 1,
    precioId: 7,
    categoriaId: 2,
    usuarioId: 3,
    verificado: 0,
    estado: 'Baja California Sur',
    municipio: 'La Paz'
  },
  {
    titulo: 'Casa Residencial Minimalista',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Avenida San Lucas B 205',
    lat: 28.63272675772412,
    lng: -106.0484450641398,
    imagen: 'anuncio14.jpg',
    publicado: 1,
    precioId: 9,
    categoriaId: 1,
    usuarioId: 3,
    verificado: 1,
    estado: 'Sonora',
    municipio: 'San Luis Río Colorado'
  },
  {
    titulo: 'Hermoso y Lujoso Departamento',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Eje 1 Poniente 568',
    lat: 27.469440008266574,
    lng: -99.547119140625,
    imagen: 'anuncio15.jpg',
    publicado: 1,
    precioId: 8,
    categoriaId: 2,
    usuarioId: 3,
    verificado: 0,
    estado: 'Ciudad de México',
    municipio: 'Benito Juárez'
  },
  {
    titulo: 'Excelente Departamento',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Ahuehuetes 31',
    lat: 26.049206282471832,
    lng: -98.30292286688488,
    imagen: 'anuncio16.jpg',
    publicado: 1,
    precioId: 7,
    categoriaId: 2,
    usuarioId: 4,
    verificado: 1,
    estado: 'México',
    municipio: 'Metepec'
  },
  {
    titulo: 'Pequeña Casa de Campo',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Ignacio Manuel Altamirano Sur 58',
    lat: 19.644985144004956,
    lng: -100.49562049549051,
    imagen: 'anuncio17.jpg',
    publicado: 1,
    precioId: 8,
    categoriaId: 1,
    usuarioId: 4,
    verificado: 0,
    estado: 'Michoacán de Ocampo',
    municipio: 'Zitácuaro'
  },
  {
    titulo: 'Departamento con Terraza',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: '2da Calle Poniente Sur 1638',
    lat: 31.854347189742874,
    lng: -116.5814377985903,
    imagen: 'anuncio18.jpg',
    publicado: 1,
    precioId: 10,
    categoriaId: 2,
    usuarioId: 4,
    verificado: 1,
    estado: 'Chiapas',
    municipio: 'Tuxtla Gutiérrez'
  },
  {
    titulo: 'Departamento Minimalista',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle 141B 826',
    lat: 32.44957311978415,
    lng: -114.77964767644472,
    imagen: 'anuncio19.jpg',
    publicado: 1,
    precioId: 7,
    categoriaId: 2,
    usuarioId: 4,
    verificado: 0,
    estado: 'Yucatán',
    municipio: 'Mérida'
  },
  {
    titulo: 'Bonito Departamento',
    descripcion: 'Casa habitación desarrollada en dos niveles de piso terminado, desplantada sobre un lote de terreno de posición medianero conun frente a calle, de topografía visiblemente plana, forma regular.',
    habitaciones: 3,
    estacionamiento: 2,
    wc: 3,
    calle: 'Calle Camarón',
    lat: 16.713826085679827,
    lng: -92.63787186928704,
    imagen: 'anuncio20.jpg',
    publicado: 1,
    precioId: 8,
    categoriaId: 2,
    usuarioId: 4,
    verificado: 1,
    estado: 'Sinaloa',
    municipio: 'Mazatlán'
  },
]

export default propiedades;