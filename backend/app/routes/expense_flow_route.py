from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import SessionLocal
from app.schemas.expense_flow_schema import ExpenseFlow
from app.services.expense_flow_service import process_expense_flow
from app.utils.auth_dependency import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/expense-flow")
def create_expense_flow(
    flow: ExpenseFlow,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    user_id = current_user["user_id"]

    result = process_expense_flow(db, flow, user_id)

    return {
        "message": "Flow processed successfully",
        "expenses_created": len(result["expenses"]),
        "total_spent": result["total_spent"],
        "timeline": result["timeline"],
        "category_breakdown": result["category_breakdown"],
        "ai_insight": result["ai_insight"]
    }