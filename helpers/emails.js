import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    debug: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      method: 'PLAIN'
    }
  });
  const { email, nombre, token } = datos
  //Enviar el email
  await transport.sendMail({
    from: 'contacto@propiedades360.com.mx',
    to: email,
    subject: 'Confirma tu cuenta en Propiedades360.com.mx',
    text: 'Confirma tu cuenta en Propiedades360.com.mx',
    html: `
    <p>Hola ${nombre}, comprueba tu cuenta en Propiedades360.com.mx</p>
    <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
    <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Confirmar Cuenta</a></p>

    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  });
}

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    debug: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
      method: 'PLAIN'
    }
  });
  const { email, nombre, token } = datos
  //Enviar el email
  await transport.sendMail({
    from: 'contacto@propiedades360.com.mx',
    to: email,
    subject: 'Restablece tu Password en Propiedades360.com.mx',
    text: 'Restablece tu Password en Propiedades360.com.mx',
    html: `
    <p>Hola ${nombre}, has solicitado cambiar tu password en Propiedades360.com.mx</p>
    <p>Sigue el siguiente en lace para generar un password nuevo:
    <a href="${process.env.BACKEND_URL}/auth/olvide-password/${token}">Reestablecer Password</a></p>

    <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
    `
  });
}

export {
  emailRegistro,
  emailOlvidePassword
}