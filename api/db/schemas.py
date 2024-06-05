from typing import Union
from pydantic import BaseModel, UUID4

class QuestionBase(BaseModel):
    text: str
    answers: str
    parent: Union[UUID4, None] = None
    category: Union[str, None]


class QuestionGet(QuestionBase):
    question_id: UUID4


class QuestionCreate(QuestionBase):
    pass