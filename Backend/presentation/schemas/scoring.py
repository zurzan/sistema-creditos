from pydantic import BaseModel


class ScoringResponse(BaseModel):
    id: int
    solicitud_id: int
    puntaje: float
    nivel_riesgo: str
    capacidad_pago: float
    ratio_deuda_ingreso: float
    observaciones: str | None = None

    class Config:
        from_attributes = True