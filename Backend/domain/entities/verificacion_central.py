from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from infrastructure.database import Base


class VerificacionCentralRiesgo(Base):
    __tablename__ = "verificaciones_central_riesgo"

    id = Column(Integer, primary_key=True, index=True)
    solicitud_id = Column(
        Integer, ForeignKey("solicitudes_credito.id"), nullable=False, unique=True
    )
    central = Column(String(50), nullable=False)
    tiene_moras = Column(Boolean, default=False)
    tiene_judicial = Column(Boolean, default=False)
    calificacion = Column(String(10), nullable=False)
    deuda_total = Column(Float, default=0)
    observaciones = Column(String(500), nullable=True)
    fecha_consulta = Column(DateTime(timezone=True), server_default=func.now())

    solicitud = relationship("SolicitudCredito", back_populates="verificacion")