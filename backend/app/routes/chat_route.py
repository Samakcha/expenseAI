from fastapi import FastAPI, APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.expense_model import Expense
from app.services.chat_service import chat_with_expenses
from app.config.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/ai-chat/{user_id}")
def ai_chat(user_id: int, question: str, db: Session = Depends(get_db)):
    expenses = db.query(Expense).filter(
        Expense.user_id == user_id
    ).all()

    response = chat_with_expenses(expenses, question)

    return {"response": response}