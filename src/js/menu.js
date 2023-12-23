
var log = 1
const usuario = document.getElementById('usuario')
const visitante = document.getElementById('visitante')

console.log(usuario)

console.log(visitante)

if(!log) {
  usuario.classList.add('hidden')
  usuario.classList.remove('flex')
} else {
  visitante.classList.add('hidden')
  visitante.classList.remove('flex')
}