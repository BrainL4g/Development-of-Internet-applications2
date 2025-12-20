from sqlalchemy import Column, Integer, String, Float, ForeignKey
from db.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String)
    price = Column(Float, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)