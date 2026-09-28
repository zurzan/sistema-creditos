from sqlalchemy.orm import Session
from infrastructure.repositories.cliente_repository import ClienteRepository
from application.clientes.obtener_cliente import obtener_cliente


def eliminar_cliente(db: Session, cliente_id: int):
    repository = ClienteRepository(db)
    cliente = obtener_cliente(db, cliente_id)
    repository.delete(cliente)
    return {"mensaje": "Cliente eliminado correctamente"}