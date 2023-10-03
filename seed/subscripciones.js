import { calcularFinSuscripcion } from "../helpers/finsub.js";

const subscripciones = [
    {
        endSub: calcularFinSuscripcion(new Date(),3650),
        usuarioId: 1,
        tiposubId: 1
    },
    {
        endSub: calcularFinSuscripcion(new Date(),3650),
        usuarioId: 2,
        tiposubId: 1
    },
    {
        endSub: calcularFinSuscripcion(new Date(),3650),
        usuarioId: 3,
        tiposubId: 1
    },
    {
        endSub: calcularFinSuscripcion(new Date(),3650),
        usuarioId: 4,
        tiposubId: 1
    }
]

export default subscripciones;