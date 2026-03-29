from sqlalchemy import Column, Integer, String
from app.config.database import Base
from sqlalchemy.orm import relationship

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, nullable=False, unique=True)

    password = Column(String, nullable=False)

    expenses = relationship(
        "Expense", 
        back_populates="user",
        cascade="all, delete-orphan")

    budget = relationship(
        "Budget",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan")

    category_budgets = relationship(
        "CategoryBudget",
        back_populates="user",
        cascade="all, delete-orphan")