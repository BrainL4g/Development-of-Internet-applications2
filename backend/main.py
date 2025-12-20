from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import Base, engine
from routes.user_routes import router as auth_router
from routes.product_routes import router as product_router

app = FastAPI(
    title="Магазин продуктов с авторизацией",
    description="Лабораторная работа ТУСУР — Разработка интернет-приложений",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(product_router)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "API магазина продуктов работает! Документация: /docs"}