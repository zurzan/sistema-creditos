from sqlalchemy.orm import Session
from domain.entities.scoring_crediticio import ScoringCrediticio


class ScoringRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(ScoringCrediticio).all()

    def get_by_id(self, scoring_id: int):
        return self.db.query(ScoringCrediticio).filter(
            ScoringCrediticio.id == scoring_id
        ).first()

    def get_by_solicitud(self, solicitud_id: int):
        return self.db.query(ScoringCrediticio).filter(
            ScoringCrediticio.solicitud_id == solicitud_id
        ).first()

    def create(self, datos: dict):
        scoring = ScoringCrediticio(**datos)
        self.db.add(scoring)
        self.db.commit()
        self.db.refresh(scoring)
        return scoring

    def delete(self, scoring):
        self.db.delete(scoring)
        self.db.commit()