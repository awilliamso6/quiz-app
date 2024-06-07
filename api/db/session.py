import os
import json

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

def build_url():
    with open("db/config/test.json") as fh:
        config = json.load(fh)
    url = os.getenv("DATABASE_URL", f"postgresql://{config['user']}:{config['pass']}@{config['host']}/{config['db']}")
    return url

engine = create_engine(build_url())
SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()