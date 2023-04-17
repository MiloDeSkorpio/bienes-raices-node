import bcrypt from 'bcrypt';

const usuarios = [
  {
    nombre: 'Efra',
    email: 'correo@correo.es',
    confirmado: 1,
    password: bcrypt.hashSync('password',10),
    rolId: 1
  },
  {
    nombre: 'Rafa',
    email: 'correo@correo.com',
    confirmado: 1,
    password: bcrypt.hashSync('password',10),
    rolId: 3
  },
]

export default usuarios;