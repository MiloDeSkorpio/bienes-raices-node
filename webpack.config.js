import path from 'path';
export default {
  mode: 'development',
  entry: {
    mapa: './src/js/mapa.js',
    agregarImagen: './src/js/agregarImagen.js',
    mostrarMapa: './src/js/mostrarMapa.js',
    cambiarEstado: './src/js/cambiarEstado.js',
    mapaInicio: './src/js/mapaInicio.js',
    menu: './src/js/menu.js'
  },
  output:{
    filename: '[name].js',
    path: path.resolve('public/js')
  }
}