import datetime
import json
from sqlalchemy.orm import Session
from sqlalchemy import delete

from . import models, schemas

CATEGORY_FLOW = {
    'Intro': 'General'
}
THRESHOLD = 1

def list_questions(db: Session):
    return db.query(models.Question).all()


def get_questions_by_category(category: str, db: Session):
    return db.query(models.Question).filter_by(category=category).all()


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


def create_submit_result(db: Session, result_submit: schemas.ResultsSubmit):
    if result_submit.category not in CATEGORY_FLOW:
        return {'next_category': 'Complete', 'questions': []}
    next_category = CATEGORY_FLOW[result_submit.category]
    current_questions = db.query(models.Question).all()
    current_questions_dict = {str(c.id): c.tag for c in current_questions}
    filter_tags = [current_questions_dict[r.question_id] for r in result_submit.result_data if r.answer <= THRESHOLD]
    next_questions = db.query(models.Question).filter_by(category=next_category).all()
    filter_questions = [q for q in next_questions if q.parent in filter_tags]
    return {'next_category': next_category, 'questions': filter_questions}


def create_initial_result(db: Session, result: schemas.ResultsInitial):
    current_questions = db.query(models.Question).all()
    submitted_dict = {r.question_id: str(r.answer) for r in result.result_a}
    result_str = ",".join([submitted_dict.get(str(i.id), "-1") for i in current_questions])
    results_row = models.Results(
        name_a=result.name_a,
        name_b=result.name_b,
        pronoun_a=result.pronoun_a,
        pronoun_b=result.pronoun_b,
        result_a=result_str,
        timestamp=datetime.datetime.now()
    )
    db.add(results_row)
    db.commit()
    db.refresh(results_row)
    return results_row


def append_second_result(db: Session, result: schemas.ResultsSecond):
    current_questions = db.query(models.Question).all()
    submitted_dict = {r.question_id: str(r.answer) for r in result.result_b}
    result_str = ",".join([submitted_dict.get(str(i.id), "-1") for i in current_questions])
    update_row = db.query(models.Results).filter_by(id=result.id).first()
    update_row.result_b = result_str
    db.commit()
    db.refresh(update_row)
    return update_row


def get_results_by_id(db: Session, result_id: str):
    return db.query(models.Results).filter_by(id=result_id).first()