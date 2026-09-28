from sqlalchemy.orm import Session
from domain.entities.verificacion_central import VerificacionCentralRiesgo


class VerificacionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(VerificacionCentralRiesgo).all()

    def get_by_id(self, verif_id: int):
        return self.db.query(VerificacionCentralRiesgo).filter(
            VerificacionCentralRiesgo.id == verif_id
        ).first()

    def get_by_solicitud(self, solicitud_id: int):
        return self.db.query(VerificacionCentralRiesgo).filter(
            VerificacionCentralRiesgo.solicitud_id == solicitud_id
        ).first()

    def create(self, datos: dict):
        verif = VerificacionCentralRiesgo(**datos)
        self.db.add(verif)
        self.db.commit()
        self.db.refresh(verif)
        return verif

    def delete(self, verif):
        self.db.delete(verif)
        self.db.commit()