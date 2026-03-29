from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)

prompt = PromptTemplate(
    input_variables=["expense"],
    template="""
Categorize this expense into one category:

Food
Transport
Shopping
Entertainment
Bills
Other

Expense: {expense}

Return ONLY the category name.
"""
)

chain = prompt | llm


def categorize_expense(expense_title: str):
    result = chain.invoke({"expense": expense_title})
    return result.content.strip()