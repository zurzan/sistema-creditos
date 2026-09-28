from sqlalchemy.orm import Session
from infrastructure.repositories.producto_repository import ProductoRepository


def listar_productos(db: Session):
    repository = ProductoRepository(db)
    return repository.get_all()