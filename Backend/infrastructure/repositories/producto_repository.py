from sqlalchemy.orm import Session
from domain.entities.producto_credito import ProductoCredito


class ProductoRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(ProductoCredito).all()

    def get_by_id(self, producto_id: int):
        return self.db.query(ProductoCredito).filter(ProductoCredito.id == producto_id).first()

    def get_by_nombre(self, nombre: str):
        return self.db.query(ProductoCredito).filter(ProductoCredito.nombre == nombre).first()

    def create(self, datos: dict):
        producto = ProductoCredito(**datos)
        self.db.add(producto)
        self.db.commit()
        self.db.refresh(producto)
        return producto

    def update(self, producto, datos: dict):
        for campo, valor in datos.items():
            setattr(producto, campo, valor)
        self.db.commit()
        self.db.refresh(producto)
        return producto

    def delete(self, producto):
        self.db.delete(producto)
        self.db.commit()