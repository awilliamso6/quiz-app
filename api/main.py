import uuid

from fastapi import FastAPI, Depends
from pydantic import BaseModel, UUID4
from sqlalchemy.orm import Session

from db.session import SessionFactory
from db import models
from db import schemas
from db import actions


app = FastAPI()

# DB Dependency
def get_db():
    mydb = SessionFactory()
    try:
        yield mydb
    finally:
        mydb.close()


@app.get("/questions")
def list_questions(db: Session = Depends(get_db)):
    resp = actions.list_questions(db)
    return {"message": resp}


@app.post("/questions/")
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    return actions.create_question(db, question)