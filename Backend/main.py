from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from infrastructure.database import Base, engine
from domain.entities import usuario as usuario_model
from domain.entities import cliente as cliente_model
from domain.entities import producto_credito as producto_model
from domain.entities import solicitud_credito as solicitud_model
from domain.entities import informacion_financiera as info_model
from domain.entities import scoring_crediticio as scoring_model
from domain.entities import verificacion_central as verif_model
from domain.entities import evaluacion as evaluacion_model
from presentation.routers import auth, cliente, producto, solicitud, evaluacion
from presentation.middlewares import configurar_middlewares

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gestion de Creditos y Evaluacion de Riesgo Crediticio",
    description="API para gestionar solicitudes de credito, scoring y evaluacion de riesgo",
    version="1.0.0",
)

configurar_middlewares(app)

app.include_router(auth.router)
app.include_router(cliente.router)
app.include_router(producto.router)
app.include_router(solicitud.router)
app.include_router(evaluacion.router)


@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")