from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_community.agent_toolkits import create_sql_agent
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

db = SQLDatabase.from_uri(DATABASE_URL)

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)

toolkit = SQLDatabaseToolkit(db=db, llm=llm)

agent_executor = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    verbose=True
)

def ask_database(question: str):
    result = agent_executor.invoke({
        "input": question
    })

    return result["output"]