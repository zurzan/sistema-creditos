from pydantic import BaseModel, Field


class InfoFinancieraBase(BaseModel):
    ingresos_mensuales: float = Field(..., gt=0)
    gastos_mensuales: float = Field(..., ge=0)
    patrimonio: float = Field(default=0, ge=0)
    deudas_actuales: float = Field(default=0, ge=0)
    años_experiencia_laboral: int = Field(default=0, ge=0)
    tipo_empleo: str | None = None


class InfoFinancieraCreate(InfoFinancieraBase):
    pass


class InfoFinancieraResponse(InfoFinancieraBase):
    id: int
    solicitud_id: int

    class Config:
        from_attributes = True