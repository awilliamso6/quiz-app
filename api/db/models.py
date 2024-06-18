import uuid
from sqlalchemy import Column, String, Uuid, DateTime
from db.session import Base

class Question(Base):
    __tablename__ = "question"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4,
        unique=True, nullable=False)
    text = Column(String, index=True, nullable=False)
    answers = Column(String, index=True, nullable=False)
    parent = Column(Uuid, index=True, nullable=True)
    category = Column(String, index=True, nullable=False)

    def __repr__(self) -> str:
        return f"Question(text={self.text}, answers={self.answers})"


class Results(Base):
    __tablename__ = "results"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4,
        unique=True, nullable=False)
    name_a = Column(String, index=True, nullable=False)
    pronoun_a = Column(String, index=True, nullable=False)
    result_a = Column(String, index=True, nullable=False)
    name_b = Column(String, index=True, nullable=False)
    pronoun_b = Column(String, index=True, nullable=False)
    result_b = Column(String, index=True, nullable=False)
    timestamp = Column(DateTime, index=True, nullable=True)

    def __repr__(self) -> str:
        return f"Results(id={self.text}, timestamp={self.timestamp})"

