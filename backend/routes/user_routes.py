from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.user import UserCreate, UserLogin, TokenResponse
from services.user_service import register_user, login_user, refresh_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user.email, user.password)

@router.post("/refresh")
def refresh(refresh_token: str):
    return refresh_token(refresh_token)