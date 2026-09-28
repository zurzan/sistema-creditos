from sqlalchemy.orm import Session
from domain.entities.informacion_financiera import InformacionFinanciera


class InfoFinancieraRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(InformacionFinanciera).all()

    def get_by_id(self, info_id: int):
        return self.db.query(InformacionFinanciera).filter(
            InformacionFinanciera.id == info_id
        ).first()

    def get_by_solicitud(self, solicitud_id: int):
        return self.db.query(InformacionFinanciera).filter(
            InformacionFinanciera.solicitud_id == solicitud_id
        ).first()

    def create(self, datos: dict):
        info = InformacionFinanciera(**datos)
        self.db.add(info)
        self.db.commit()
        self.db.refresh(info)
        return info

    def update(self, info, datos: dict):
        for campo, valor in datos.items():
            setattr(info, campo, valor)
        self.db.commit()
        self.db.refresh(info)
        return info

    def delete(self, info):
        self.db.delete(info)
        self.db.commit()