from sqlalchemy.orm import Session
from infrastructure.repositories.cliente_repository import ClienteRepository


def listar_clientes(db: Session):
    repository = ClienteRepository(db)
    return repository.get_all()