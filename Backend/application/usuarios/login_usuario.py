from fastapi import HTTPException
from sqlalchemy.orm import Session
from infrastructure.repositories.usuario_repository import UsuarioRepository
from infrastructure.security import verificar_password, crear_token


def login_usuario(db: Session, username: str, password: str):
    repository = UsuarioRepository(db)
    usuario = repository.get_by_username(username)
    if not usuario or not verificar_password(password, usuario.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales invalidas")
    token = crear_token({"sub": usuario.username, "rol": usuario.rol})
    return {"access_token": token, "token_type": "bearer"}