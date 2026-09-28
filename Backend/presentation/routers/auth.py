from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from infrastructure.database import get_db
from presentation.schemas.usuario import UsuarioCreate, UsuarioResponse, Token
from application.usuarios.registrar_usuario import registrar_usuario
from application.usuarios.login_usuario import login_usuario

router = APIRouter(prefix="/auth", tags=["Autenticacion"])


@router.post("/registro", response_model=UsuarioResponse, status_code=201)
def registrar(datos: UsuarioCreate, db: Session = Depends(get_db)):
    return registrar_usuario(db, datos)


@router.post("/login", response_model=Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return login_usuario(db, form.username, form.password)