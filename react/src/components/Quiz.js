import { useState } from 'react';
import styles from '../styles/Quiz.module.css';

function Question({ questionData, userNames, handleAnswerClick }) {

    const renderAnswers = (answers) => {
      const rows = [];
      for (let i = 0; i < answers.length; i += 3) {
        rows.push(
          <div className={styles.answerRow} key={i}>
            {answers.slice(i, i + 3).map((answer, index) => (
              <div className={styles.answer} key={index}>
                <button
                  className={answer.isSelected ? styles.answerClicked : styles.answerUnclicked}
                  onClick={() => handleAnswerClick(questionData, index)}
                >{answer.text}</button>
              </div>
            ))}
          </div>
        )
      }

      return rows;
    };

    return (
      <div className={styles.questionContainer}>
        <p>{questionData.question.replace("%p", userNames.partnerName)}</p>
        <div className={styles.answersContainer}>{renderAnswers(questionData.answers)}</div>
      </div>
    );
  }
  
  function Quiz({ data, userNames, handleQuizSubmit }) {
  
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
      <div className={styles.quizContainer}>
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
        <button type="submit" onClick={() => handleQuizSubmit(quizData)}>Submit!</button>
      </div>
    )
  }

export default Quiz;