from sqlalchemy.orm import Session
from domain.entities.usuario import Usuario


class UsuarioRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Usuario).all()

    def get_by_id(self, usuario_id: int):
        return self.db.query(Usuario).filter(Usuario.id == usuario_id).first()

    def get_by_username(self, username: str):
        return self.db.query(Usuario).filter(Usuario.username == username).first()

    def create(self, datos: dict):
        usuario = Usuario(**datos)
        self.db.add(usuario)
        self.db.commit()
        self.db.refresh(usuario)
        return usuario

    def delete(self, usuario):
        self.db.delete(usuario)
        self.db.commit()