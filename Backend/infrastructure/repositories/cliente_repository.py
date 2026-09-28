from sqlalchemy.orm import Session
from domain.entities.cliente import Cliente


class ClienteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Cliente).all()

    def get_by_id(self, cliente_id: int):
        return self.db.query(Cliente).filter(Cliente.id == cliente_id).first()

    def get_by_dni(self, dni: str):
        return self.db.query(Cliente).filter(Cliente.dni == dni).first()

    def create(self, datos: dict):
        cliente = Cliente(**datos)
        self.db.add(cliente)
        self.db.commit()
        self.db.refresh(cliente)
        return cliente

    def update(self, cliente, datos: dict):
        for campo, valor in datos.items():
            setattr(cliente, campo, valor)
        self.db.commit()
        self.db.refresh(cliente)
        return cliente

    def delete(self, cliente):
        self.db.delete(cliente)
        self.db.commit()