from pydantic import BaseModel, Field


class ProductoBase(BaseModel):
    nombre: str = Field(..., min_length=3, max_length=100)
    tipo: str = Field(..., min_length=3, max_length=20)
    tasa_interes: float = Field(..., ge=0)
    monto_minimo: float = Field(..., gt=0)
    monto_maximo: float = Field(..., gt=0)
    plazo_maximo_meses: int = Field(..., gt=0)
    descripcion: str | None = None


class ProductoCreate(ProductoBase):
    pass


class ProductoResponse(ProductoBase):
    id: int
    activo: bool

    class Config:
        from_attributes = True