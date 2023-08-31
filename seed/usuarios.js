import bcrypt from 'bcrypt';

const usuarios = [
  {
    nombre: 'Karen',
    email: 'karen@correo.es',
    confirmado: 1,
    password: bcrypt.hashSync('password',10),
    imgPerfil: 'karen.jpg',
    rolId: 1
  },
  {
    nombre: 'Rafa',
    email: 'rafa@correo.com',
    confirmado: 1,
    password: bcrypt.hashSync('password',10),
    imgPerfil: 'rafa.jpg',
    rolId: 3
  },
  {
    nombre: 'Pedro',
    email: 'pedro@correo.com',
    confirmado: 1,
    password: bcrypt.hashSync('password',10),
    imgPerfil: 'pedro.jpg',
    rolId: 4
  },
  {
    nombre: 'Luis',
    email: 'luis@correo.com',
    confirmado: 1,
    password: bcrypt.hashSync('password',10),
    imgPerfil: 'luis.jpg',
    rolId: 5
  },
]

export default usuarios;