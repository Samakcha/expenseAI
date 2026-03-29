import io
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.expense_model import Expense
from app.services.insight_service import generate_insight
from reportlab.lib.pagesizes import LETTER
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle

def generate_pdf_report(db: Session, user_id: int):
    # 1. Fetch Data
    expenses = db.query(Expense).filter(Expense.user_id == user_id).all()
    
    total_spent = sum(e.amount for e in expenses)
    
    category_data = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(Expense.user_id == user_id)
        .group_by(Expense.category)
        .all()
    )
    
    category_breakdown = {cat: amt for cat, amt in category_data}
    
    # Generate AI insights
    summary_question = "Provide a comprehensive financial summary and specific savings recommendations based on these expenses."
    ai_insights = generate_insight(expenses, summary_question)
    
    # 2. Create PDF
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=LETTER)
    styles = getSampleStyleSheet()
    elements = []

    # Title
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        textColor=colors.HexColor("#3b82f6") # Primary color blue
    )
    elements.append(Paragraph("AI Financial Report", title_style))
    elements.append(Spacer(1, 12))

    # Summary Section
    elements.append(Paragraph("Financial Overview", styles['Heading2']))
    elements.append(Paragraph(f"Total Expenses: ${total_spent:,.2f}", styles['Normal']))
    elements.append(Spacer(1, 12))

    # Category Breakdown Table
    elements.append(Paragraph("Category Breakdown", styles['Heading2']))
    data = [["Category", "Amount"]]
    for cat, amt in category_breakdown.items():
        data.append([cat, f"${amt:,.2f}"])
    
    t = Table(data, colWidths=[200, 100])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#eff6ff")),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
    ]))
    elements.append(t)
    elements.append(Spacer(1, 20))

    # AI Insights
    elements.append(Paragraph("AI Insights & Recommendations", styles['Heading2']))
    # Split insights by double newline to handle paragraphs if any
    insight_paragraphs = ai_insights.split('\n')
    for p in insight_paragraphs:
        if p.strip():
            elements.append(Paragraph(p.strip(), styles['Normal']))
            elements.append(Spacer(1, 8))

    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer