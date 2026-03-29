from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.expense_model import Expense
from app.services.insight_service import generate_insight


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/ai-insight/{user_id}")
def ai_insight(user_id: int, question: str, db: Session = Depends(get_db)):
    expenses = db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

    insight = generate_insight(expenses, question)

    return {"insight": insight}