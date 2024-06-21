import os
import uuid

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import gspread

from db.session import SessionFactory
from db import schemas
from db import actions


app = FastAPI()
origin = os.getenv("CORS_ORIGIN")
if origin is None:
    raise RuntimeError("CORS_ORIGIN not defined in env. Unable to set up CORSMiddleware for FastAPI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

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
    return resp


@app.post("/questions/")
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    return actions.create_question(db, question)


@app.delete("/questions/")
def delete_questions(db: Session = Depends(get_db)):
    actions.empty_questions(db)


@app.post("/results/initial")
def results_initial(result: schemas.ResultsInitial, db: Session = Depends(get_db)):
    return actions.create_initial_result(db, result)


@app.post("/results/second")
def results_second(result: schemas.ResultsSecond, db: Session = Depends(get_db)):
    return actions.append_second_result(db, result)


@app.get("/results/{result_id}")
def results_by_id(result_id: str, db: Session = Depends(get_db)):
    return actions.get_results_by_id(db, result_id)


@app.post("/sync/")
def sync_questions(db: Session = Depends(get_db)):
    gc = gspread.service_account(filename='/code/service_account.json')
    try:
        sh = gc.open("test_spreadsheet")
    except gspread.exceptions.SpreadsheetNotFound as ex:
        raise HTTPException(status_code=500, detail=f"Exception opening Google Sheet: {type(ex)}:{ex}")
    data = sh.sheet1.get_all_values()
    for (text, answers, parent, category) in data[1:]:
        question = schemas.QuestionCreate(
            text=text,
            answers=answers,
            category=category
        )
        result = actions.create_question(db, question)
        print(result)

