from app.routes.expense_route import router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import engine, Base
from app.routes import expense_route
from app.routes import user_route
from app.routes import insight_route
from app.routes import chat_route
from app.routes import sql_agent_route
from app.routes import report_route
from app.routes import budget_route
from app.routes import expense_flow_route

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expense_route.router)
app.include_router(user_route.router)
app.include_router(insight_route.router)
app.include_router(chat_route.router)
app.include_router(sql_agent_route.router)
app.include_router(report_route.router)
app.include_router(budget_route.router)
app.include_router(expense_flow_route.router)

@app.get("/")
def home():

    return {"message": "Expense tracker backend running"}