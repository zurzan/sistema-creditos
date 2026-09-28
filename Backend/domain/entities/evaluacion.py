from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from infrastructure.database import Base


class Evaluacion(Base):
    __tablename__ = "evaluaciones"

    id = Column(Integer, primary_key=True, index=True)
    solicitud_id = Column(
        Integer, ForeignKey("solicitudes_credito.id"), nullable=False, unique=True
    )
    analista_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    decision = Column(String(20), nullable=False)
    monto_aprobado = Column(Float, nullable=True)
    tasa_final = Column(Float, nullable=True)
    motivo = Column(String(500), nullable=True)
    fecha_evaluacion = Column(DateTime(timezone=True), server_default=func.now())

    solicitud = relationship("SolicitudCredito", back_populates="evaluacion")