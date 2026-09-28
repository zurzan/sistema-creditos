from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.cliente_repository import ClienteRepository
from presentation.schemas.cliente import ClienteCreate


def crear_cliente(db: Session, datos: ClienteCreate):
    repository = ClienteRepository(db)
    existente = repository.get_by_dni(datos.dni)
    if existente:
        raise HTTPException(status_code=400, detail="Ya existe un cliente con ese DNI")
    return repository.create(datos.model_dump())