from app.utils.auth_dependency import get_current_user
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserLogin, UserUpdate
from app.services.user_service import create_user, login_user, get_user, update_user, delete_user
from app.config.database import SessionLocal


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user)

@router.get("/profile")
def profile(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return get_user(db, user["user_id"])

@router.put("/profile")
def update_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
): 
    return update_user(db, user["user_id"], user_data)

@router.delete("/profile")
def delete_profile(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return delete_user(db, user["user_id"])