import os
import json

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

def build_url():
    url = os.getenv("DATABASE_URL")
    if not url:
        print("DATABASE_URL env not found. Attempting to load dev file...")
        with open("db/.config.json") as fh:
            config = json.load(fh)
        url = f"postgresql://{config['user']}:{config['pass']}@{config['host']}/{config['db']}"
    if not url:
        raise RuntimeError("Unable to build DB URL. No env or dev file found.")
    return url

engine = create_engine(build_url())
SessionFactory = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()