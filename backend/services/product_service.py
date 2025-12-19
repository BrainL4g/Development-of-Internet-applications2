from typing import List, Optional
from sqlalchemy.orm import Session
from repositories.product_repository import (
    get_products as repo_get_products,
    get_product_by_id as repo_get_product_by_id,
    create_product as repo_create_product,
    update_product as repo_update_product,
    delete_product as repo_delete_product,
)
from schemas.product import ProductCreate, ProductUpdate, ProductSchema


class ProductService:
    @staticmethod
    def get_product_list(db: Session, skip: int = 0, limit: int = 100) -> List[ProductSchema]:
        return repo_get_products(db, skip=skip, limit=limit)

    @staticmethod
    def get_product_by_id(db: Session, product_id: int) -> Optional[ProductSchema]:
        return repo_get_product_by_id(db, product_id)

    @staticmethod
    def create_product(db: Session, product_data: ProductCreate) -> ProductSchema:
        return repo_create_product(db, product_data)

    @staticmethod
    def update_product(db: Session, product_id: int, product_update: ProductUpdate) -> Optional[ProductSchema]:
        return repo_update_product(db, product_id, product_update)

    @staticmethod
    def delete_product(db: Session, product_id: int) -> bool:
        return repo_delete_product(db, product_id)


get_product_list = ProductService.get_product_list
get_product_by_id = ProductService.get_product_by_id
create_product = ProductService.create_product
update_product = ProductService.update_product
delete_product = ProductService.delete_product
