from sqlalchemy import Column, Integer, Float, ForeignKey
from app.config.database import Base
from sqlalchemy.orm import relationship

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, default=1000.0)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)

    user = relationship("User", back_populates="budget")
