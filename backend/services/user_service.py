from sqlalchemy.orm import Session
from repositories.user_repository import get_user_by_email, create_user, verify_password, get_password_hash
from schemas.user import UserCreate, UserSchema
from fastapi import HTTPException, status
import jwt
from datetime import datetime, timedelta, timezone
from core.config import settings


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def register_user(db: Session, user_data: UserCreate) -> UserSchema:
    if get_user_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    if user_data.password != user_data.password_confirm:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    hashed = get_password_hash(user_data.password)
    user = create_user(db, user_data.email, hashed)

    return UserSchema.model_validate(user)


def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access = create_access_token({"sub": user.email})
    refresh = create_refresh_token({"sub": user.email})

    return {
        "access_token": access,
        "refresh_token": refresh,
        "token_type": "bearer",
        "user": UserSchema.model_validate(user)
    }


def refresh_token(refresh: str):
    try:
        payload = jwt.decode(refresh, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        email = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

    return {"access_token": create_access_token({"sub": email}), "token_type": "bearer"}