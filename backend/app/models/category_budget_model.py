from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.config.database import Base
from sqlalchemy.orm import relationship

class CategoryBudget(Base):
    __tablename__ = "category_budgets"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)
    amount = Column(Float, default=0.0)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="category_budgets")
