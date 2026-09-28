from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from infrastructure.database import Base


class ScoringCrediticio(Base):
    __tablename__ = "scoring_crediticio"

    id = Column(Integer, primary_key=True, index=True)
    solicitud_id = Column(
        Integer, ForeignKey("solicitudes_credito.id"), nullable=False, unique=True
    )
    puntaje = Column(Float, nullable=False)
    nivel_riesgo = Column(String(20), nullable=False)
    capacidad_pago = Column(Float, nullable=False)
    ratio_deuda_ingreso = Column(Float, nullable=False)
    observaciones = Column(String(500), nullable=True)
    fecha_calculo = Column(DateTime(timezone=True), server_default=func.now())

    solicitud = relationship("SolicitudCredito", back_populates="scoring")