from pydantic import BaseModel, Field


class EvaluacionBase(BaseModel):
    decision: str = Field(..., min_length=3, max_length=20)
    monto_aprobado: float | None = None
    tasa_final: float | None = None
    motivo: str | None = None


class EvaluacionCreate(EvaluacionBase):
    pass


class EvaluacionResponse(EvaluacionBase):
    id: int
    solicitud_id: int
    analista_id: int

    class Config:
        from_attributes = True