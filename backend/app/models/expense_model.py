from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from datetime import datetime
from app.config.database import Base
from sqlalchemy.orm import relationship

class Expense(Base):

    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    amount = Column(Float, nullable=False)

    category = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="expenses")
