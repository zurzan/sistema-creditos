from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from infrastructure.database import get_db
from presentation.schemas.solicitud import (
    SolicitudCreate,
    SolicitudResponse,
)
from presentation.dependencies import requerir_rol
from application.solicitudes.listar_solicitudes import listar_solicitudes
from application.solicitudes.obtener_solicitud import obtener_solicitud
from application.solicitudes.crear_solicitud import crear_solicitud
from application.solicitudes.eliminar_solicitud import eliminar_solicitud

router = APIRouter(
    prefix="/solicitudes",
    tags=["Solicitudes de Credito"],
    dependencies=[Depends(requerir_rol("admin", "analista", "cliente"))],
)


@router.get("/", response_model=list[SolicitudResponse])
def listar(db: Session = Depends(get_db)):
    return listar_solicitudes(db)


@router.get("/{solicitud_id}", response_model=SolicitudResponse)
def obtener(solicitud_id: int, db: Session = Depends(get_db)):
    return obtener_solicitud(db, solicitud_id)


@router.post("/", response_model=SolicitudResponse, status_code=201)
def crear(
    solicitud: SolicitudCreate,
    db: Session = Depends(get_db),
    usuario=Depends(requerir_rol("admin", "analista", "cliente")),
):
    return crear_solicitud(db, solicitud)


@router.delete("/{solicitud_id}")
def eliminar(
    solicitud_id: int,
    db: Session = Depends(get_db),
    usuario=Depends(requerir_rol("admin")),
):
    return eliminar_solicitud(db, solicitud_id)