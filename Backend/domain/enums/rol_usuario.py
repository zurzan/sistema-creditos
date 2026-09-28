from enum import Enum


class RolUsuario(str, Enum):
    ADMIN = "admin"
    ANALISTA = "analista"
    CLIENTE = "cliente"
    