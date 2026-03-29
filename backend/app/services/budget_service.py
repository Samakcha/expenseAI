from sqlalchemy.orm import Session
from app.models.budget_model import Budget

from app.models.category_budget_model import CategoryBudget

def get_user_budget(db: Session, user_id: int):
    budget = db.query(Budget).filter(Budget.user_id == user_id).first()
    if not budget:
        # Create default budget if not exists
        budget = Budget(amount=1000.0, user_id=user_id)
        db.add(budget)
        db.commit()
        db.refresh(budget)
    return budget

def update_user_budget(db: Session, user_id: int, amount: float):
    budget = get_user_budget(db, user_id)
    budget.amount = amount
    db.commit()
    db.refresh(budget)
    return budget

def get_category_budgets(db: Session, user_id: int):
    return db.query(CategoryBudget).filter(CategoryBudget.user_id == user_id).all()

def update_category_budget(db: Session, user_id: int, category: str, amount: float):
    budget = db.query(CategoryBudget).filter(
        CategoryBudget.user_id == user_id,
        CategoryBudget.category == category
    ).first()
    
    if budget:
        budget.amount = amount
    else:
        budget = CategoryBudget(user_id=user_id, category=category, amount=amount)
        db.add(budget)
    
    db.commit()
    db.refresh(budget)
    return budget

def delete_category_budget(db: Session, user_id: int, category_id: int):
    budget = db.query(CategoryBudget).filter(
        CategoryBudget.user_id == user_id,
        CategoryBudget.id == category_id
    ).first()
    
    if budget:
        db.delete(budget)
        db.commit()
        return True
    return False