from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.solicitud_repository import SolicitudRepository
from infrastructure.repositories.cliente_repository import ClienteRepository
from infrastructure.repositories.producto_repository import ProductoRepository
from presentation.schemas.solicitud import SolicitudCreate


def crear_solicitud(db: Session, datos: SolicitudCreate):
    cliente_repo = ClienteRepository(db)
    producto_repo = ProductoRepository(db)
    solicitud_repo = SolicitudRepository(db)

    cliente = cliente_repo.get_by_id(datos.cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    producto = producto_repo.get_by_id(datos.producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto de crédito no encontrado")

    if datos.monto_solicitado < producto.monto_minimo:
        raise HTTPException(
            status_code=400,
            detail=f"El monto mínimo para este producto es {producto.monto_minimo}"
        )

    if datos.monto_solicitado > producto.monto_maximo:
        raise HTTPException(
            status_code=400,
            detail=f"El monto máximo para este producto es {producto.monto_maximo}"
        )

    if datos.plazo_meses > producto.plazo_maximo_meses:
        raise HTTPException(
            status_code=400,
            detail=f"El plazo máximo para este producto es {producto.plazo_maximo_meses} meses"
        )

    solicitud_dict = datos.model_dump()
    solicitud_dict["estado"] = "pendiente"
    return solicitud_repo.create(solicitud_dict)