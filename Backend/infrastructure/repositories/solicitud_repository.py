from sqlalchemy.orm import Session
from domain.entities.solicitud_credito import SolicitudCredito


class SolicitudRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(SolicitudCredito).all()

    def get_by_id(self, solicitud_id: int):
        return self.db.query(SolicitudCredito).filter(SolicitudCredito.id == solicitud_id).first()

    def get_by_cliente(self, cliente_id: int):
        return self.db.query(SolicitudCredito).filter(
            SolicitudCredito.cliente_id == cliente_id
        ).all()

    def get_by_estado(self, estado: str):
        return self.db.query(SolicitudCredito).filter(
            SolicitudCredito.estado == estado
        ).all()

    def create(self, datos: dict):
        solicitud = SolicitudCredito(**datos)
        self.db.add(solicitud)
        self.db.commit()
        self.db.refresh(solicitud)
        return solicitud

    def update_estado(self, solicitud, nuevo_estado: str):
        solicitud.estado = nuevo_estado
        self.db.commit()
        self.db.refresh(solicitud)
        return solicitud

    def delete(self, solicitud):
        self.db.delete(solicitud)
        self.db.commit()