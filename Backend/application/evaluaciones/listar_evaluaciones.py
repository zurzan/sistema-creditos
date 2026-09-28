from sqlalchemy.orm import Session
from infrastructure.repositories.evaluacion_repository import EvaluacionRepository


def listar_evaluaciones(db: Session):
    repository = EvaluacionRepository(db)
    return repository.get_all()