import uuid
from db.session import SessionFactory
from db.models import Question

from fastapi import FastAPI
from pydantic import BaseModel, UUID4

app = FastAPI()
mydb = SessionFactory()

class QuestionModel(BaseModel):
    text: str
    answers: str
    parent: UUID4 = None
    category: str


@app.get("/questions")
def list_questions():
    resp = mydb.query(Question).first()
    return {"message": resp}


@app.post("/questions/")
def create_question(q: QuestionModel):
    q = Question(
        text=q.text,
        answers=q.answers,
        category=q.category
    )
    mydb.add(q)
    mydb.commit()