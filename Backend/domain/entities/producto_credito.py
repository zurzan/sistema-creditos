from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from infrastructure.database import Base


class ProductoCredito(Base):
    __tablename__ = "productos_credito"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)
    tipo = Column(String(20), nullable=False)
    tasa_interes = Column(Float, nullable=False)
    monto_minimo = Column(Float, nullable=False)
    monto_maximo = Column(Float, nullable=False)
    plazo_maximo_meses = Column(Integer, nullable=False)
    descripcion = Column(String(255), nullable=True)
    activo = Column(Boolean, default=True)
    creado_en = Column(DateTime(timezone=True), server_default=func.now())

    solicitudes = relationship("SolicitudCredito", back_populates="producto")
    