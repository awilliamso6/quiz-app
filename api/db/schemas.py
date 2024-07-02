from typing import Union, List
from datetime import datetime
from pydantic import BaseModel, UUID4

class QuestionBase(BaseModel):
    text: str
    answers: str
    parent: Union[str, None] = None
    category: Union[str, None]
    tag: str


class QuestionGet(QuestionBase):
    id: UUID4


class QuestionCreate(QuestionBase):
    pass


class ResultsGet(BaseModel):
    id: UUID4


class ResultsResponse(BaseModel):
    id: UUID4
    result_a: str
    result_b: str
    timestamp: datetime


class ResultElement(BaseModel):
    question_id: str
    answer: int


class ResultsSubmit(BaseModel):
    result_data: List[ResultElement]
    category: str


class ResultsInitial(BaseModel):
    name_a: str
    pronoun_a: str
    name_b: str
    pronoun_b: str
    result_a: List[ResultElement]


class ResultsSecond(BaseModel):
    id: UUID4
    result_b: List[ResultElement]