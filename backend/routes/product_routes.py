from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List
from db.database import get_db
from schemas.product import ProductSchema, ProductCreate, ProductUpdate
from services.product_service import (
    get_product_list,
    get_product_by_id,
    create_product,
    update_product,
    delete_product,
)

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=List[ProductSchema])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_product_list(db, skip=skip, limit=limit)


@router.get("/{product_id}", response_model=ProductSchema)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("/", response_model=ProductSchema)
def create_product_route(
        name: str = Form(...),
        description: str = Form(None),
        price: float = Form(...),
        db: Session = Depends(get_db)
):
    if price <= 0:
        raise HTTPException(status_code=422, detail="Цена должна быть больше 0")

    product_data = ProductCreate(name=name, description=description, price=price)
    return create_product(db, product_data)


@router.put("/{product_id}", response_model=ProductSchema)
def update_product_route(
        product_id: int,
        product_update: ProductUpdate,
        db: Session = Depends(get_db)
):
    if product_update.price is not None and product_update.price <= 0:
        raise HTTPException(status_code=422, detail="Цена должна быть больше 0")

    updated = update_product(db, product_id, product_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated


@router.delete("/{product_id}")
def delete_product_route(product_id: int, db: Session = Depends(get_db)):
    success = delete_product(db, product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"detail": "Product deleted successfully"}
