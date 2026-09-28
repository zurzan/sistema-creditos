from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from infrastructure.database import get_db
from presentation.schemas.cliente import ClienteCreate, ClienteResponse
from presentation.dependencies import requerir_rol
from application.clientes.listar_clientes import listar_clientes
from application.clientes.obtener_cliente import obtener_cliente
from application.clientes.crear_cliente import crear_cliente
from application.clientes.eliminar_cliente import eliminar_cliente

router = APIRouter(
    prefix="/clientes",
    tags=["Clientes"],
    dependencies=[Depends(requerir_rol("admin", "analista"))],
)


@router.get("/", response_model=list[ClienteResponse])
def listar(db: Session = Depends(get_db)):
    return listar_clientes(db)


@router.get("/{cliente_id}", response_model=ClienteResponse)
def obtener(cliente_id: int, db: Session = Depends(get_db)):
    return obtener_cliente(db, cliente_id)


@router.post("/", response_model=ClienteResponse, status_code=201)
def crear(cliente: ClienteCreate, db: Session = Depends(get_db)):
    return crear_cliente(db, cliente)


@router.delete("/{cliente_id}")
def eliminar(cliente_id: int, db: Session = Depends(get_db)):
    return eliminar_cliente(db, cliente_id)