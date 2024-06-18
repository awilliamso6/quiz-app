# Quiz App

Web app using a React Javascript front-end,FastAPI Python backend, and PostgreSQL database. Quizzes are designed to be taken by a user, then a link is generated to be sent to a second user. Both users' results can then be compared.

The FastAPI component uses SQLAlchemy as a Python-based ORM for the database, as well as Alembic for handling database migrations.


## Components

| Component | Purpose | Details
| --------- | ------- | -------
| React JS  | front-end app | [React Home](https://react.dev/)
| FastAPI   | back-end API services | [FastAPI Home](https://fastapi.tiangolo.com/)
| PostgreSQL | database | [PostgreSQL Home](https://www.postgresql.org/)


#### React Components
NameForm - Form for the initial user to establish their name and their partner's name.
Quiz - Component that lists quiz questions as retrieved from the database


#### API Services
All APIs that interact with the database use SQLAlchemy as a ORM to make queries and mutations.

**GET /questions:** Retrieves a list of questions

**POST /questions:** Adds a question to the DB

**DELETE /questions:** Delete all questions in DB

**POST /results/initial:** Inserts initial result and returns an ID associated with the result pair

**POST /results/second:** Inserts second result alongside first entry

**GET /results/{result_id}:** Get result by ID

**POST /sync:** Deletes questions from DB, runs Google API to retrieve new list from associated Sheet, then inserts new list into DB