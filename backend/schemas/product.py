from pydantic import BaseModel, Field, field_validator
from typing import Optional


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

    @field_validator('price')
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Цена должна быть больше 0')
        return v


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None

    @field_validator('price')
    def price_must_be_positive(cls, v):
        if v is not None and v <= 0:
            raise ValueError('Цена должна быть больше 0')
        return v


class ProductSchema(ProductBase):
    id: int

    class Config:
        from_attributes = True
