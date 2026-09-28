from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.producto_repository import ProductoRepository
from presentation.schemas.producto import ProductoCreate


def crear_producto(db: Session, datos: ProductoCreate):
    repository = ProductoRepository(db)
    existente = repository.get_by_nombre(datos.nombre)
    if existente:
        raise HTTPException(status_code=400, detail="Ya existe un producto con ese nombre")

    if datos.monto_minimo >= datos.monto_maximo:
        raise HTTPException(
            status_code=400,
            detail="El monto mínimo debe ser menor al monto máximo"
        )

    return repository.create(datos.model_dump())