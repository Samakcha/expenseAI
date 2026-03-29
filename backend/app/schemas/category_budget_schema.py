from pydantic import BaseModel
from typing import List, Optional

class CategoryBudgetSchema(BaseModel):
    category: str
    amount: float

class CategoryBudgetResponse(BaseModel):
    id: int
    category: str
    amount: float
    user_id: int

    class Config:
        orm_mode = True
