from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import Base, engine
from routes.product_routes import router as product_router
from routes.chat import router as chat_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Магазин продуктов — REST API",
    description="Лабораторная работа по разработке REST API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "Добро пожаловать в API магазина продуктов!"}