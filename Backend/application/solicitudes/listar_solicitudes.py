from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository


def listar_solicitudes(db: Session):
    repository = SolicitudRepository(db)
    return repository.get_all()