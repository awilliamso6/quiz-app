import { useState, useEffect } from 'react';
import axios from 'axios';
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
  
function Quiz({ category, userNames, handleQuizSubmit }) {
  
  const [quizState, setQuizState] = useState('LOADING');
  const [quizData, setQuizData] = useState(null);
  const [categoryState, setCategoryState] = useState(category);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setQuizState('LOADING');
        const response = await axios.get("http://127.0.0.1:8000/questions?category=" + category);
        console.log(response.data);
        setQuizData(formatData(response.data));
        setQuizState('READY');
      } catch (err) {
        console.log("Error: Unable to retrieve questions");
        console.log(err);
        setQuizState('ERROR');
      }
    };

    fetchQuestions();
  }, []);


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

  const submitResults = async (resultsData) => {
    const formData = {
      category: categoryState,
      result_data: resultsData,
    };
    console.log(formData);
    try {
      const response = await axios.post("http://127.0.0.1:8000/results/submit", formData);
      console.log(response.data);
      //setResultsData(response.data);
      //setAppState('RESULT');
      const {next_category, questions} = response.data;
      console.log(next_category);
      setCategoryState(next_category);
      if (next_category === "Complete") {
        handleQuizSubmit(quizData);
      } else {
        setQuizData(formatData(questions));
      }

    } catch (err) {
      console.log("Error: Unable to submit results")
      console.log(err);
    }
  };

  const handleQuizComplete = () => {
    const submitQuizData = quizData.map((qElement) => ({
      question_id: qElement.id,
      answer: qElement.answers.findIndex(e => e.isSelected)
    }));
    console.log("Q & A");
    console.log(submitQuizData);
    submitResults(submitQuizData);

    //handleQuizSubmit(quizData);
  };

  const formatData = (data) => {
    console.log(data);
    return data.map((item) => ({
      id: item.id,
      question: item.text,
      parent: item.parent,
      answers: item.answers.split(",").map((item) => ({text: item, isSelected: false}))
    }));
  };

  if (quizState === 'LOADING') {
    return (
      <div>LOADING...</div>
    )
  } else if (quizState === 'ERROR') {
    return (
      <div>ERROR!</div>
    )
  }

  return (
    <div className={styles.quizContainer}>
      <p>{category}</p>
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
      <button type="submit" onClick={() => handleQuizComplete(quizData)}>Submit!</button>
    </div>
  )
}

export default Quiz;