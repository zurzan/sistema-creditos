from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.cliente_repository import ClienteRepository


def obtener_cliente(db: Session, cliente_id: int):
    repository = ClienteRepository(db)
    cliente = repository.get_by_id(cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente