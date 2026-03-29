from sqlalchemy.orm import Session
from app.models.user_model import User
from app.utils.auth_utils import hash_password, verify_password
from app.utils.jwt_utils import create_access_token

def create_user(db: Session, user):
    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login_user(db: Session, user_data):
    user = db.query(User).filter(User.email == user_data.email).first()

    if user is None:
        return {"error": "Invalid credentials"}
    
    if not verify_password(user_data.password, user.password):
        return {"error": "Invalid password"}
    
    token = create_access_token(
        {"user_id": user.id}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

def get_user(db: Session, user_id):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:
        return {"error": "User not found"}
    
    return user

def update_user(db: Session, user_id, user_data):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:
        return {"error": "User not found"}
    
    user.name = user_data.name
    user.email = user_data.email

    db.commit()
    db.refresh(user)

    return user

def delete_user(db: Session, user_id):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:
        return {"error": "User not found"}
    
    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}