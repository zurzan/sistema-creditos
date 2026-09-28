from enum import Enum


class TipoCredito(str, Enum):
    PERSONAL = "personal"
    HIPOTECARIO = "hipotecario"
    VEHICULAR = "vehicular"
    EMPRESARIAL = "empresarial"
    MICROCREDITO = "microcredito"