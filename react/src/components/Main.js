import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import NameForm from './NameForm';
import Quiz from './Quiz';
import Result from './Result';

  
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
  
function Main() {
  
  /*STATE DATA*/
  const [appState, setAppState] = useState('FORM');

  const [categoryState, setCategoryState] = useState('Intro');

  const [userNames, setUserNames] = useState({
    myName: "",
    myPronouns: "",
    partnerName: "",
    partnerPronouns: ""
  });

  const [testData, setTestData] = useState(null);

  const [resultsData, setResultsData] = useState(null);
  /*STATE DATA*/

  const [quizId, setQuizId] = useState(useQuery().get('name'));

  useEffect(() => {
    const fetchResults = async (result_id) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/results/${result_id}`);
        console.log(response.data);
        setResultsData(response.data);
        setUserNames({
          ...userNames,
          myName: response.data.name_b,
          myPronouns: response.data.pronoun_b,
          partnerName: response.data.name_a,
          partnerPronouns: response.data.pronoun_a
        });
        if (response.data.result_a && response.data.result_b) {
          setAppState('RESULT');
        }
      } catch (err) {
        console.log("Error: Unable to retrieve results");
        console.log(err);
      }
    };

    if (quizId) {
      fetchResults(quizId);
    }
  }, []);

  /*
  const handleInputChange = (name, value) => {
    setUserNames({
      ...userNames,
      [name]: value
    });
  };
  */

  const handleFormSubmit = (event) => {
    event.preventDefault(); // for suppressing default form behavior
    setAppState('QUIZ');
    console.log("Names:" + userNames.myName + ", " + userNames.partnerName);
  };

  const handleQuizSubmit = async (quizData) => {
    const submitQuizData = quizData.map((qElement) => ({
      question_id: qElement.id,
      answer: qElement.answers.findIndex(e => e.isSelected)
    }));

    if (quizId) {
      // Second submission of results
      const formData = {
        id: quizId,
        result_b: submitQuizData
      };
      console.log(formData);
      try {
        const response = await axios.post("http://127.0.0.1:8000/results/second", formData);
        console.log(response.data);
        setResultsData(response.data);
        setAppState('RESULT');
      } catch (err) {
        console.log("Error: Unable to submit results")
        console.log(err);
      }
    } else {

      // Initial submission of results
      const formData = {
        name_a: userNames.myName,
        pronoun_a: userNames.myPronouns,
        result_a: submitQuizData,
        name_b: userNames.partnerName,
        pronoun_b: userNames.partnerPronouns
      };
      console.log(formData);
      try {
        const response = await axios.post("http://127.0.0.1:8000/results/initial", formData);
        console.log(response.data);
        setResultsData(response.data);
        setAppState('RESULT');
      } catch (err) {
        console.log("Error: Unable to submit results")
        console.log(err);
      }
    }
  };

  return (
    <div className="main">
      {appState === 'FORM' && <NameForm quizId={quizId} userNames={userNames} setUserNames={setUserNames} handleFormSubmit={handleFormSubmit} />}
      {appState === 'QUIZ' && <Quiz category={categoryState} userNames={userNames} handleQuizSubmit={handleQuizSubmit} />}
      {appState === 'RESULT' && <Result data={resultsData} />}
    </div>
  );
}

export default Main;