import datetime
from sqlalchemy.orm import Session
from sqlalchemy import delete

from . import models, schemas


def list_questions(db: Session):
    return db.query(models.Question).all()


def create_question(db: Session, question: schemas.QuestionCreate):
    question_row = models.Question(**question.dict())
    db.add(question_row)
    db.commit()
    db.refresh(question_row)
    return question_row


def empty_questions(db: Session):
    st = delete(models.Question)
    db.execute(st)
    db.commit()


def create_initial_result(db: Session, result: schemas.ResultsInitial):
    results_row = models.Results(**result.dict())
    results_row.timestamp = datetime.datetime.now()
    db.add(results_row)
    db.commit()
    db.refresh(results_row)
    return results_row


def append_second_result(db: Session, result: schemas.ResultsSecond):
    update_row = db.query(models.Results).filter_by(id=result.id).first()
    update_row.result_b = result.result_b
    db.commit()
    db.refresh(update_row)
    return update_row