from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.services.report_service import generate_pdf_report
from app.utils.auth_dependency import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/generate-report")
def generate_report(
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    try:
        pdf_buffer = generate_pdf_report(db, user["user_id"])
        
        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=AI_Financial_Report.pdf"
            }
        )
    except Exception as e:
        print(f"Error generating report: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate financial report")