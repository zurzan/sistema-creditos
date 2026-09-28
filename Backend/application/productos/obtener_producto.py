from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.producto_repository import ProductoRepository


def obtener_producto(db: Session, producto_id: int):
    repository = ProductoRepository(db)
    producto = repository.get_by_id(producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto