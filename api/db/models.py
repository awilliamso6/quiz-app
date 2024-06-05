import uuid
from sqlalchemy import Column, Integer, String, Uuid
from db.session import Base

class Question(Base):
    __tablename__ = "question"

    question_id = Column(Uuid, primary_key=True, default=uuid.uuid4,
        unique=True, nullable=False)
    text = Column(String, index=True, nullable=False)
    answers = Column(String, index=True, nullable=False)
    parent = Column(Uuid, index=True, nullable=True)
    category = Column(String, index=True, nullable=False)

    def __repr__(self) -> str:
        return f"Question(text={self.text}, answers={self.answers})"

