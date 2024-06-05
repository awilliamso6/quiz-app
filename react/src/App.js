import { useReducer, useState } from 'react';
import './App.css';

import quizData from './stub.js';

const AppStates = Object.freeze({
  FORM: "FORM",
  QUIZ: "QUIZ"
});

const appReducer = (state, action) => {
  switch (action.type) {
    case 'FORM':
      return AppStates.FORM;
    case 'QUIZ':
      return AppStates.QUIZ;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function Question({ questionData, userNames, handleAnswerClick }) {
  return (
    <div className="question-container">
      <p>{questionData.question.replace("%p", userNames.partnerName)}</p>
      <div className='answer-grid'>
        {questionData.answers.map((answer, index) => (
          <button
          className={answer.isSelected ? "answer-clicked" : "answer-unclicked"}
          key={index}
          onClick={() => handleAnswerClick(questionData, index)}
          >{answer.text}</button>
        ))}
      </div>
    </div>
  );
}

function Quiz({ data, userNames }) {

  const [quizData, setQuizData] = useState(data);

  const handleAnswerClick = (questionData, answerId) => {
    console.log("Answered! " + questionData.id + " Answer: " + answerId);

    const updatedQuizData = quizData.map((qElement, qIndex) => {
      if (qElement.id === questionData.id) {
        return updateQuestion(qElement, answerId);
      }
      return qElement;
    });
    setQuizData(updatedQuizData);
  };

  const updateQuestion = (question, answerId) => {
    return {
      ...question,
      answers: question.answers.map((aElement, aIndex) => {
        if (aIndex === answerId) {
          return {
            ...aElement,
            isSelected: true
          }
        }
        return {
          ...aElement,
          isSelected: false
        };
      })
    }
  };

  return (
    <div className='quiz-container'>
      <p>Cool Quiz Time</p>
      {quizData.map((element) => {
        return (
          <Question 
          key={element.id}
          questionData={element}
          userNames={userNames}
          handleAnswerClick={handleAnswerClick}
          />
        )
      })}
      <button type="submit">Submit!</button>
    </div>
  )
}

function NameForm({ userNames, handleFormSubmit, handleInputChange }) {
  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-entry">
          <label htmlFor="myName">Your Name:</label>
          <input type="text" id="myName" name="myName" value={userNames.myName} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
        </div>
        <div className="form-entry">
          <label htmlFor="myName">Partner Name:</label>
          <input type="text" id="partnerName" name="partnerName" value={userNames.partnerName} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function App() {

  const [userNames, setUserNames] = useState({
    myName: "",
    partnerName: ""
  });

  const [appState, dispatch] = useReducer(appReducer, AppStates.FORM);

  const handleInputChange = (name, value) => {
    setUserNames({
      ...userNames,
      [name]: value
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'QUIZ' });
    console.log("Names:" + userNames.myName + ", " + userNames.partnerName);
  };

  const formatData = (data) => {
    return data.map((item) => ({
      id: item.id,
      question: item.question,
      parent: item.parent,
      answers: item.answers.split(",").map((item) => ({text: item, isSelected: false}))
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        {appState === AppStates.FORM && <NameForm userNames={userNames} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />}
        {appState === AppStates.QUIZ && <Quiz data={formatData(quizData)} userNames={userNames} />}
      </header>
    </div>
  );
}

export default App;
