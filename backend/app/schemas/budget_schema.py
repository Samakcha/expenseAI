from pydantic import BaseModel

class BudgetSchema(BaseModel):
    amount: float

class BudgetResponse(BudgetSchema):
    id: int
    user_id: int

    class Config:
        from_attributes = True
