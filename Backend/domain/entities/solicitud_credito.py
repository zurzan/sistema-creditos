from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from infrastructure.database import Base


class SolicitudCredito(Base):
    __tablename__ = "solicitudes_credito"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("clientes.id"), nullable=False)
    producto_id = Column(Integer, ForeignKey("productos_credito.id"), nullable=False)
    monto_solicitado = Column(Float, nullable=False)
    plazo_meses = Column(Integer, nullable=False)
    proposito = Column(String(255), nullable=True)
    estado = Column(String(20), default="pendiente")
    fecha_solicitud = Column(DateTime(timezone=True), server_default=func.now())

    cliente = relationship("Cliente", back_populates="solicitudes")
    producto = relationship("ProductoCredito", back_populates="solicitudes")
    informacion_financiera = relationship(
        "InformacionFinanciera", back_populates="solicitud", uselist=False
    )
    scoring = relationship(
        "ScoringCrediticio", back_populates="solicitud", uselist=False
    )
    verificacion = relationship(
        "VerificacionCentralRiesgo", back_populates="solicitud", uselist=False
    )
    evaluacion = relationship(
        "Evaluacion", back_populates="solicitud", uselist=False
    )