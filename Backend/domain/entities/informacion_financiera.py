from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from infrastructure.database import Base


class InformacionFinanciera(Base):
    __tablename__ = "informacion_financiera"

    id = Column(Integer, primary_key=True, index=True)
    solicitud_id = Column(
        Integer, ForeignKey("solicitudes_credito.id"), nullable=False, unique=True
    )
    ingresos_mensuales = Column(Float, nullable=False)
    gastos_mensuales = Column(Float, nullable=False)
    patrimonio = Column(Float, default=0)
    deudas_actuales = Column(Float, default=0)
    años_experiencia_laboral = Column(Integer, default=0)
    tipo_empleo = Column(String(50), nullable=True)
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())

    solicitud = relationship("SolicitudCredito", back_populates="informacion_financiera")