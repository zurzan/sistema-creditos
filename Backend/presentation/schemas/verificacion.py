from pydantic import BaseModel, Field


class VerificacionBase(BaseModel):
    central: str = Field(..., min_length=3, max_length=50)


class VerificacionCreate(VerificacionBase):
    pass


class VerificacionResponse(BaseModel):
    id: int
    solicitud_id: int
    central: str
    tiene_moras: bool
    tiene_judicial: bool
    calificacion: str
    deuda_total: float
    observaciones: str | None = None

    class Config:
        from_attributes = True