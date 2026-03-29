from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.2
)

prompt = PromptTemplate(
    input_variables=["expenses", "question"],
    template="""
        You are a financial assistant.

        Here are the user's expenses:

        {expenses}

        User question:
        {question}

        Analyze the expenses and give a helpful financial insight.
        Keep the answer short and practical.
        """
)

chain = prompt | llm


def generate_insight(expenses, question):

    expense_text = "\n".join(
        [f"{e.title} - {e.amount} - {e.category}" for e in expenses]
    )

    result = chain.invoke({
        "expenses": expense_text,
        "question": question
    })

    return result.content