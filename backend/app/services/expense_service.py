from sqlalchemy.orm import Session
from app.models.expense_model import Expense
from app.services.ai_service import categorize_expense

def create_expense(db: Session, expense, user_id):

    ai_category = categorize_expense(expense.title)

    new_expense = Expense(
        title=expense.title,
        amount=expense.amount,
        category=ai_category,
        user_id=user_id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

def get_expenses(db: Session, user_id, page, limit, category = None, sort = None):

    skip = (page - 1) * limit

    query = db.query(Expense).filter(Expense.user_id == user_id)

    if category:
        query = query.filter(Expense.category == category)
    
    if sort == "asc":
        query = query.order_by(Expense.amount.asc())

    elif sort == "desc":
        query = query.order_by(Expense.amount.desc())
    
    total = query.count()

    expenses = query.offset(skip).limit(limit).all()
    
    # Map created_at to date for frontend compatibility
    formatted_expenses = []
    for e in expenses:
        expense_dict = {
            "id": e.id,
            "title": e.title,
            "amount": e.amount,
            "category": e.category,
            "date": e.created_at.isoformat() if e.created_at else None
        }
        formatted_expenses.append(expense_dict)

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": formatted_expenses
    }

def delete_expense(db, expense_id, user_id):

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user_id
    ).first()

    if expense is None:
        return {"error": "Expense not found"}
    
    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}

def update_expense(db, expense_id, expense_data, user_id):
    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == user_id
    ).first()

    if expense is None:
        return {"error": "Expense not found"}
    
    expense.title = expense_data.title
    expense.amount = expense_data.amount
    expense.category = expense_data.category

    db.commit()
    db.refresh(expense)

    return expense