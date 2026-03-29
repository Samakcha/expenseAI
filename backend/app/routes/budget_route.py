from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.schemas.budget_schema import BudgetSchema, BudgetResponse
from app.services.budget_service import get_user_budget, update_user_budget, get_category_budgets, update_category_budget, delete_category_budget
from app.utils.auth_dependency import get_current_user
from app.schemas.category_budget_schema import CategoryBudgetSchema, CategoryBudgetResponse
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/budget", response_model=BudgetResponse)
def get_budget(
    db: Session = Depends(get_db), 
    user = Depends(get_current_user)
):
    return get_user_budget(db, user["user_id"])

@router.put("/budget", response_model=BudgetResponse)
def update_budget(
    budget_data: BudgetSchema,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return update_user_budget(db, user["user_id"], budget_data.amount)

@router.get("/budgets/categories", response_model=List[CategoryBudgetResponse])
def get_category_budgets_route(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_category_budgets(db, current_user["user_id"])

@router.post("/budgets/categories", response_model=CategoryBudgetResponse)
def update_category_budget_route(budget_data: CategoryBudgetSchema, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return update_category_budget(db, current_user["user_id"], budget_data.category, budget_data.amount)

@router.delete("/budgets/categories/{category_id}")
def delete_category_budget_route(category_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    success = delete_category_budget(db, current_user["user_id"], category_id)
    if not success:
        return {"detail": "Budget not found"}
    return {"message": "Budget deleted"}