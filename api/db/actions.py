from sqlalchemy.orm import Session

from . import models, schemas


def list_questions(db: Session):
    return db.query(models.Question).all()


def create_question(db: Session, question: schemas.QuestionCreate):
    question_row = models.Question(**question.dict())
    db.add(question_row)
    db.commit()
    db.refresh(question_row)
    return question_row