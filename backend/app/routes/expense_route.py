from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.schemas.expense_schema import ExpenseCreate
from app.services.expense_service import create_expense, get_expenses, delete_expense, update_expense
from app.config.database import SessionLocal
from app.utils.auth_dependency import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
@router.post("/expense")
def add_expense(
    expense: ExpenseCreate, 
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
    ):
    return create_expense(db, expense, user["user_id"])

@router.get("/expenses")
def get_all_expenses(
    page: int = Query(1, ge=1),
    limit: int = Query(10, le=100),
    category: str | None = None,
    sort: str | None = None,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
    ):

    return get_expenses(
        db=db, 
        user_id=user["user_id"],
        page=page,
        limit=limit,
        category=category,
        sort=sort
    )

@router.delete("/expense/{expense_id}")
def remove_expense(
    expense_id: int, 
    db: Session = Depends(get_db), 
    user = Depends(get_current_user)
    ):

    return delete_expense(db, expense_id, user["user_id"])

@router.put("/expense/{expense_id}")
def edit_expense(
    expense_id: int, 
    expense: ExpenseCreate, 
    db: Session = Depends(get_db), 
    user = Depends(get_current_user)
    ):

    return update_expense(db, expense_id, expense, user["user_id"])