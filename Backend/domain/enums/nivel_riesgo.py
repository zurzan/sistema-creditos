from enum import Enum


class NivelRiesgo(str, Enum):
    MUY_BAJO = "muy_bajo"
    BAJO = "bajo"
    MEDIO = "medio"
    ALTO = "alto"
    MUY_ALTO = "muy_alto"
    