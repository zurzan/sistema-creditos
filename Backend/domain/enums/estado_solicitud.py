from enum import Enum


class EstadoSolicitud(str, Enum):
    PENDIENTE = "pendiente"
    EN_EVALUACION = "en_evaluacion"
    APROBADO = "aprobado"
    RECHAZADO = "rechazado"
    DESEMBOLSADO = "desembolsado"