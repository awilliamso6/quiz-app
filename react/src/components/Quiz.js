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
        <button type="submit" onClick={() => handleQuizSubmit(quizData)}>Submit!</button>
      </div>
    )
  }

export default Quiz;