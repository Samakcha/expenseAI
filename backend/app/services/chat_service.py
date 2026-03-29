from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.3
)

prompt = PromptTemplate (
    input_variables=["expenses", "question"],
    template="""
    You are a personal assistant.
    
    Here are the user's expenses:
    {expenses}

    User question:
    {question}

    Answer the question using the expense data.
    If possible give useful financial advice.
    """
)

chain = prompt | llm

def chat_with_expenses(expenses, question):

    expense_text = "\n".join(
        [f"{e.title} - {e.amount} - {e.category}" for e in expenses]
    )

    result = chain.invoke({
        "expenses": expense_text,
        "question": question
    })

    return result.content