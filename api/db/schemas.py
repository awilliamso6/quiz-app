from typing import Union
from datetime import datetime
from pydantic import BaseModel, UUID4

class QuestionBase(BaseModel):
    text: str
    answers: str
    parent: Union[UUID4, None] = None
    category: Union[str, None]


class QuestionGet(QuestionBase):
    id: UUID4


class QuestionCreate(QuestionBase):
    pass


class ResultsGet(BaseModel):
    id: UUID4
    result_a: str
    result_b: str
    timestamp: datetime


class ResultsInitial(BaseModel):
    result_a: str


class ResultsSecond(BaseModel):
    id: UUID4
    result_b: str