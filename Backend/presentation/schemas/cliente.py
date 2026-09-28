from pydantic import BaseModel, Field, EmailStr
from datetime import date


class ClienteBase(BaseModel):
    dni: str = Field(..., min_length=5, max_length=20)
    nombres: str = Field(..., min_length=2, max_length=100)
    apellidos: str = Field(..., min_length=2, max_length=100)
    fecha_nacimiento: date
    telefono: str | None = None
    email: EmailStr | None = None
    direccion: str | None = None
    ingresos_mensuales: float = Field(..., gt=0)


class ClienteCreate(ClienteBase):
    pass


class ClienteUpdate(BaseModel):
    nombres: str | None = None
    apellidos: str | None = None
    telefono: str | None = None
    email: EmailStr | None = None
    direccion: str | None = None
    ingresos_mensuales: float | None = None


class ClienteResponse(ClienteBase):
    id: int
    activo: bool

    class Config:
        from_attributes = True