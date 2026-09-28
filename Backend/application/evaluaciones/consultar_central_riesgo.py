from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository
from infrastructure.repositories.verificacion_repository import VerificacionRepository
from presentation.schemas.verificacion import VerificacionCreate
import random


def consultar_central_riesgo(db: Session, solicitud_id: int, datos: VerificacionCreate):
    solicitud_repo = SolicitudRepository(db)
    verif_repo = VerificacionRepository(db)

    solicitud = solicitud_repo.get_by_id(solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    if verif_repo.get_by_solicitud(solicitud_id):
        raise HTTPException(
            status_code=400,
            detail="Esta solicitud ya tiene una verificación en central de riesgo"
        )

    tiene_moras = random.choice([True, False])
    tiene_judicial = random.choice([True, False])
    calificacion = random.choice(["A", "B", "C", "D", "E"])
    deuda_total = random.randint(0, 10000)

    verif_dict = {
        "solicitud_id": solicitud_id,
        "central": datos.central,
        "tiene_moras": tiene_moras,
        "tiene_judicial": tiene_judicial,
        "calificacion": calificacion,
        "deuda_total": deuda_total,
        "observaciones": "Consulta simulada a central de riesgo",
    }

    return verif_repo.create(verif_dict)