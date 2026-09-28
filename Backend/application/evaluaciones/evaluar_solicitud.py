from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository
from infrastructure.repositories.scoring_repository import ScoringRepository
from infrastructure.repositories.verificacion_repository import VerificacionRepository
from infrastructure.repositories.evaluacion_repository import EvaluacionRepository
from presentation.schemas.evaluacion import EvaluacionCreate


def evaluar_solicitud(db: Session, solicitud_id: int, datos: EvaluacionCreate, analista_id: int):
    solicitud_repo = SolicitudRepository(db)
    scoring_repo = ScoringRepository(db)
    verif_repo = VerificacionRepository(db)
    eval_repo = EvaluacionRepository(db)

    solicitud = solicitud_repo.get_by_id(solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    if eval_repo.get_by_solicitud(solicitud_id):
        raise HTTPException(
            status_code=400,
            detail="Esta solicitud ya fue evaluada"
        )

    scoring = scoring_repo.get_by_solicitud(solicitud_id)
    if not scoring:
        raise HTTPException(
            status_code=400,
            detail="No se puede evaluar sin un scoring calculado"
        )

    verificacion = verif_repo.get_by_solicitud(solicitud_id)
    if not verificacion:
        raise HTTPException(
            status_code=400,
            detail="No se puede evaluar sin verificación en central de riesgo"
        )

    if datos.decision == "aprobado":
        if scoring.nivel_riesgo in ["alto", "muy_alto"]:
            raise HTTPException(
                status_code=400,
                detail="No se puede aprobar una solicitud con riesgo alto o muy alto"
            )

        if verificacion.tiene_moras or verificacion.tiene_judicial:
            raise HTTPException(
                status_code=400,
                detail="No se puede aprobar una solicitud con moras o problemas judiciales"
            )

        if verificacion.calificacion in ["D", "E"]:
            raise HTTPException(
                status_code=400,
                detail="No se puede aprobar una solicitud con calificación D o E"
            )

        if not datos.monto_aprobado:
            raise HTTPException(
                status_code=400,
                detail="Debe indicar el monto aprobado"
            )

        if datos.monto_aprobado > solicitud.monto_solicitado:
            raise HTTPException(
                status_code=400,
                detail="El monto aprobado no puede superar el monto solicitado"
            )

    evaluacion_dict = {
        "solicitud_id": solicitud_id,
        "analista_id": analista_id,
        "decision": datos.decision,
        "monto_aprobado": datos.monto_aprobado if datos.decision == "aprobado" else None,
        "tasa_final": datos.tasa_final,
        "motivo": datos.motivo,
    }

    evaluacion = eval_repo.create(evaluacion_dict)

    nuevo_estado = "aprobado" if datos.decision == "aprobado" else "rechazado"
    solicitud_repo.update_estado(solicitud, nuevo_estado)

    return evaluacion