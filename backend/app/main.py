from fastapi import FastAPI
from .database import engine
from app import models
from routers import visitor,medicine,symptom,disease,visit,visit_files
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(root_path="/api")
app.router.redirect_slashes = False

origins = [
    "http://localhost",
    "http://127.0.0.1",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)

app.include_router(visitor.router)
app.include_router(visit.router)
app.include_router(visit_files.router)
app.include_router(medicine.router)
app.include_router(symptom.router)
app.include_router(disease.router)