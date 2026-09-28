from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository


def obtener_solicitud(db: Session, solicitud_id: int):
    repository = SolicitudRepository(db)
    solicitud = repository.get_by_id(solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    return solicitud