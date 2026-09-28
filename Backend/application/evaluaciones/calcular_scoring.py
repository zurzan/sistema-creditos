from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository
from infrastructure.repositories.info_financiera_repository import InfoFinancieraRepository
from infrastructure.repositories.scoring_repository import ScoringRepository
from presentation.schemas.informacion_financiera import InfoFinancieraCreate


def calcular_scoring(db: Session, solicitud_id: int, info: InfoFinancieraCreate):
    solicitud_repo = SolicitudRepository(db)
    info_repo = InfoFinancieraRepository(db)
    scoring_repo = ScoringRepository(db)

    solicitud = solicitud_repo.get_by_id(solicitud_id)
    if not solicitud:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")

    if scoring_repo.get_by_solicitud(solicitud_id):
        raise HTTPException(
            status_code=400,
            detail="Esta solicitud ya tiene un scoring calculado"
        )

    info_dict = info.model_dump()
    info_dict["solicitud_id"] = solicitud_id
    info_repo.create(info_dict)

    ingresos = info.ingresos_mensuales
    gastos = info.gastos_mensuales
    deudas = info.deudas_actuales
    experiencia = info.años_experiencia_laboral

    capacidad_pago = ingresos - gastos - deudas
    ratio_deuda_ingreso = (deudas / ingresos * 100) if ingresos > 0 else 100

    puntaje = 0

    if ingresos > 3000:
        puntaje += 30
    elif ingresos > 1500:
        puntaje += 20
    else:
        puntaje += 10

    if capacidad_pago > 1500:
        puntaje += 30
    elif capacidad_pago > 500:
        puntaje += 20
    else:
        puntaje += 10

    if ratio_deuda_ingreso < 30:
        puntaje += 20
    elif ratio_deuda_ingreso < 50:
        puntaje += 10

    if experiencia > 5:
        puntaje += 20
    elif experiencia > 2:
        puntaje += 10

    if puntaje >= 80:
        nivel = "muy_bajo"
    elif puntaje >= 60:
        nivel = "bajo"
    elif puntaje >= 40:
        nivel = "medio"
    elif puntaje >= 20:
        nivel = "alto"
    else:
        nivel = "muy_alto"

    scoring_dict = {
        "solicitud_id": solicitud_id,
        "puntaje": puntaje,
        "nivel_riesgo": nivel,
        "capacidad_pago": capacidad_pago,
        "ratio_deuda_ingreso": ratio_deuda_ingreso,
        "observaciones": "Scoring calculado automáticamente",
    }

    return scoring_repo.create(scoring_dict)