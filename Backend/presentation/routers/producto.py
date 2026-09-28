from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from infrastructure.database import get_db
from presentation.schemas.producto import ProductoCreate, ProductoResponse
from presentation.dependencies import requerir_rol
from application.productos.listar_productos import listar_productos
from application.productos.obtener_producto import obtener_producto
from application.productos.crear_producto import crear_producto
from application.productos.eliminar_producto import eliminar_producto

router = APIRouter(
    prefix="/productos",
    tags=["Productos de Credito"],
    dependencies=[Depends(requerir_rol("admin", "analista"))],
)


@router.get("/", response_model=list[ProductoResponse])
def listar(db: Session = Depends(get_db)):
    return listar_productos(db)


@router.get("/{producto_id}", response_model=ProductoResponse)
def obtener(producto_id: int, db: Session = Depends(get_db)):
    return obtener_producto(db, producto_id)


@router.post("/", response_model=ProductoResponse, status_code=201)
def crear(
    producto: ProductoCreate,
    db: Session = Depends(get_db),
    usuario=Depends(requerir_rol("admin")),
):
    return crear_producto(db, producto)


@router.delete("/{producto_id}")
def eliminar(
    producto_id: int,
    db: Session = Depends(get_db),
    usuario=Depends(requerir_rol("admin")),
):
    return eliminar_producto(db, producto_id)