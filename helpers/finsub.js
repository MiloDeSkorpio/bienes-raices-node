function calcularFinSuscripcion(fechaInicio, duracionEnDias) {
  // Obtiene la fecha actual
  const fechaActual = new Date();

  // Calcula la fecha de fin de la suscripción
  const fechaFin = new Date(fechaActual.getTime() + (duracionEnDias * 86400000));

  // Devuelve la fecha de fin
  return fechaFin;
}

export {
  calcularFinSuscripcion
}