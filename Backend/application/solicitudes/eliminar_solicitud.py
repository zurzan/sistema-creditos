from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository
from application.solicitudes.obtener_solicitud import obtener_solicitud


def eliminar_solicitud(db: Session, solicitud_id: int):
    repository = SolicitudRepository(db)
    solicitud = obtener_solicitud(db, solicitud_id)
    repository.delete(solicitud)
    return {"mensaje": "Solicitud eliminada correctamente"}