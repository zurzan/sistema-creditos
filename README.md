# Sistema de Gestión de Créditos y Evaluación de Riesgo Crediticio

Backend y Frontend para la gestión de solicitudes de crédito, evaluación automática de riesgo y toma de decisiones.

## 🚀 Tecnologías

### Backend

- Python 3.12
- FastAPI
- SQLAlchemy 2.0
- PostgreSQL
- JWT (python-jose)
- bcrypt (passlib)

### Frontend

- React 18
- TypeScript
- Vite
- React Router 6
- Axios
- CSS puro

## 🏛️ Arquitectura

Ambos proyectos siguen **Clean Architecture** con 4 capas:

- `domain/` → Entidades y reglas de negocio
- `infrastructure/` → BD, seguridad, repositorios
- `application/` → Casos de uso
- `presentation/` → API / UI

## 📁 Estructura
