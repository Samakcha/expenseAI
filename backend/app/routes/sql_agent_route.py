from fastapi import APIRouter
from app.services.sql_agent_service import ask_database

router = APIRouter()

@router.post("/ai-database")
def ai_database(question: str):
    response = ask_database(question)

    return {
        "answer": response
    }