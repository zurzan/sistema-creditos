from sqlalchemy.orm import Session
from domain.entities.evaluacion import Evaluacion


class EvaluacionRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Evaluacion).all()

    def get_by_id(self, evaluacion_id: int):
        return self.db.query(Evaluacion).filter(
            Evaluacion.id == evaluacion_id
        ).first()

    def get_by_solicitud(self, solicitud_id: int):
        return self.db.query(Evaluacion).filter(
            Evaluacion.solicitud_id == solicitud_id
        ).first()

    def get_by_analista(self, analista_id: int):
        return self.db.query(Evaluacion).filter(
            Evaluacion.analista_id == analista_id
        ).all()

    def create(self, datos: dict):
        evaluacion = Evaluacion(**datos)
        self.db.add(evaluacion)
        self.db.commit()
        self.db.refresh(evaluacion)
        return evaluacion

    def delete(self, evaluacion):
        self.db.delete(evaluacion)
        self.db.commit()