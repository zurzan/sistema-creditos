from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from infrastructure.database import get_db
from presentation.schemas.informacion_financiera import InfoFinancieraCreate
from presentation.schemas.verificacion import VerificacionCreate, VerificacionResponse
from presentation.schemas.evaluacion import EvaluacionCreate, EvaluacionResponse
from presentation.schemas.scoring import ScoringResponse
from presentation.dependencies import requerir_rol
from application.evaluaciones.calcular_scoring import calcular_scoring
from application.evaluaciones.consultar_central_riesgo import consultar_central_riesgo
from application.evaluaciones.evaluar_solicitud import evaluar_solicitud
from application.evaluaciones.listar_evaluaciones import listar_evaluaciones

router = APIRouter(
    prefix="/evaluaciones",
    tags=["Evaluaciones de Credito"],
)


@router.get(
    "/",
    response_model=list[EvaluacionResponse],
    dependencies=[Depends(requerir_rol("admin", "analista"))],
)
def listar(db: Session = Depends(get_db)):
    return listar_evaluaciones(db)


@router.post(
    "/{solicitud_id}/scoring",
    response_model=ScoringResponse,
    status_code=201,
    dependencies=[Depends(requerir_rol("admin", "analista"))],
)
def calcular(solicitud_id: int, info: InfoFinancieraCreate, db: Session = Depends(get_db)):
    return calcular_scoring(db, solicitud_id, info)


@router.post(
    "/{solicitud_id}/verificacion",
    response_model=VerificacionResponse,
    status_code=201,
    dependencies=[Depends(requerir_rol("admin", "analista"))],
)
def consultar(solicitud_id: int, datos: VerificacionCreate, db: Session = Depends(get_db)):
    return consultar_central_riesgo(db, solicitud_id, datos)


@router.post(
    "/{solicitud_id}/evaluar",
    response_model=EvaluacionResponse,
    status_code=201,
    dependencies=[Depends(requerir_rol("admin", "analista"))],
)
def evaluar(
    solicitud_id: int,
    datos: EvaluacionCreate,
    db: Session = Depends(get_db),
    usuario=Depends(requerir_rol("admin", "analista")),
):
    return evaluar_solicitud(db, solicitud_id, datos, usuario.id)