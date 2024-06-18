import { useReducer, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import NameForm from './components/NameForm';
import Quiz from './components/Quiz';
import Result from './components/Result';

const AppStates = Object.freeze({
  FORM: "FORM",
  QUIZ: "QUIZ",
  RESULT: "RESULT"
});

const appReducer = (state, action) => {
  switch (action.type) {
    case 'FORM':
      return AppStates.FORM;
    case 'QUIZ':
      return AppStates.QUIZ;
    case 'RESULT':
      return AppStates.RESULT;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Main() {

  /*STATE DATA*/
  const [appState, dispatch] = useReducer(appReducer, AppStates.FORM);

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/questions");
        console.log(response.data);
        setTestData(response.data);
      } catch (err) {
        console.log("Error: Unable to retrieve questions");
        console.log(err);
      }
    };

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
          dispatch({ type: 'RESULT' });
        }
      } catch (err) {
        console.log("Error: Unable to retrieve results");
        console.log(err);
      }
    };

    fetchData();

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
    event.preventDefault();
    dispatch({ type: 'QUIZ' });
    console.log("Names:" + userNames.myName + ", " + userNames.partnerName);
  };

  const handleQuizSubmit = async (quizData) => {
    const submitQuizData = quizData.map((qElement, qIndex) => {
      //const answerIndex = qElement.answers.findIndex(e => e.isSelected);
      //console.log("ID:" + qElement.id + ", Answer:" + answerIndex);
      return qElement.answers.findIndex(e => e.isSelected);
    }).join(',');
    if (quizId) {
      const formData = {
        id: quizId,
        result_b: submitQuizData
      };
      console.log(formData);
      try {
        const response = await axios.post("http://127.0.0.1:8000/results/second", formData);
        console.log(response.data);
        setResultsData(response.data);
        dispatch({ type: 'RESULT' });
      } catch (err) {
        console.log("Error: Unable to submit results")
        console.log(err);
      }
    } else {
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
        dispatch({ type: 'RESULT' });
      } catch (err) {
        console.log("Error: Unable to submit results")
        console.log(err);
      }
    }
  };

  const formatData = (data) => {
    console.log(data);
    return data.map((item) => ({
      id: item.id,
      question: item.text,
      parent: item.parent,
      answers: item.answers.split(",").map((item) => ({text: item, isSelected: false}))
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        {appState === AppStates.FORM && <NameForm quizId={quizId} resultsData={resultsData} userNames={userNames} setUserNames={setUserNames} handleFormSubmit={handleFormSubmit} />}
        {appState === AppStates.QUIZ && <Quiz data={formatData(testData)} userNames={userNames} handleQuizSubmit={handleQuizSubmit} />}
        {appState === AppStates.RESULT && <Result data={resultsData} />}
      </header>
    </div>
  );
}

function App () {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  )
}

export default App;
