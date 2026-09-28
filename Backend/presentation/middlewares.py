import time
import traceback
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class ManejarErroresMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as e:
            traceback.print_exc()
            return JSONResponse(
                status_code=500,
                content={"detail": f"Error interno: {str(e)}"},
            )


class LogRequestsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        inicio = time.time()
        response = await call_next(request)
        duracion = time.time() - inicio
        print(
            f"{request.method} {request.url.path} - "
            f"{response.status_code} - {duracion:.3f}s"
        )
        return response


def configurar_middlewares(app: FastAPI):
    app.add_middleware(ManejarErroresMiddleware)
    app.add_middleware(LogRequestsMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )