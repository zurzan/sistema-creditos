from pydantic import BaseModel, Field
from datetime import datetime


class SolicitudBase(BaseModel):
    cliente_id: int
    producto_id: int
    monto_solicitado: float = Field(..., gt=0)
    plazo_meses: int = Field(..., gt=0)
    proposito: str | None = None


class SolicitudCreate(SolicitudBase):
    pass


class SolicitudResponse(SolicitudBase):
    id: int
    estado: str
    fecha_solicitud: datetime

    class Config:
        from_attributes = True


class SolicitudEstadoUpdate(BaseModel):
    nuevo_estado: str = Field(..., min_length=3, max_length=20)