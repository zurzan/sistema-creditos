from sqlalchemy.orm import Session
from infrastructure.repositories.producto_repository import ProductoRepository
from application.productos.obtener_producto import obtener_producto


def eliminar_producto(db: Session, producto_id: int):
    repository = ProductoRepository(db)
    producto = obtener_producto(db, producto_id)
    repository.delete(producto)
    return {"mensaje": "Producto eliminado correctamente"}
