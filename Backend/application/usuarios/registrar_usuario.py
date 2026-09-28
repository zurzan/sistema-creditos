from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.usuario_repository import UsuarioRepository
from infrastructure.security import hashear_password
from presentation.schemas.usuario import UsuarioCreate


def registrar_usuario(db: Session, datos: UsuarioCreate):
    repository = UsuarioRepository(db)
    existente = repository.get_by_username(datos.username)
    if existente:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    usuario_dict = {
        "username": datos.username,
        "password_hash": hashear_password(datos.password),
        "nombre_completo": datos.nombre_completo,
        "email": datos.email,
        "rol": datos.rol,
    }
    return repository.create(usuario_dict)