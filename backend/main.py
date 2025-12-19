from fastapi import FastAPI
from db.database import Base, engine
from routes.product_routes import router as product_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Магазин продуктов — REST API",
    description="Лабораторная работа по разработке REST API",
    version="1.0"
)

app.include_router(product_router)


@app.get("/")
def root():
    return {"message": "Добро пожаловать в API магазина продуктов!"}
