import styles from '../styles/NameForm.module.css';

function NameForm({ quizId, userNames, setUserNames, handleFormSubmit }) {

  const handleInputChange = (name, value) => {
    setUserNames({
      ...userNames,
      [name]: value
    });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleFormSubmit}>
        {
          quizId ? (
            <div>
              <p>Greetings! {userNames.partnerName} has sent this quiz to {userNames.myName} Give it a try!</p>
            </div>
          ) : ( 
          <>
            <div className={styles.formEntry}>
              <label htmlFor="myName">Your Name:</label>
              <input type="text" id="myName" name="myName" value={userNames.myName} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
              <select name="myPronouns" value={userNames.myPronouns} onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
                <option value="" disabled>Preferred Pronoun</option>
                <option value="he/him">he/him</option>
                <option value="she/her">she/her</option>
                <option value="they/them">they/them</option>
              </select>
            </div>
            <div className={styles.formEntry}>
              <label htmlFor="myName">Partner Name:</label>
              <input type="text" id="partnerName" name="partnerName" value={userNames.partnerName} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
              <select name="partnerPronouns" value={userNames.partnerPronouns} onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
                <option value="" disabled>Preferred Pronoun</option>
                <option value="he/him">he/him</option>
                <option value="she/her">she/her</option>
                <option value="they/them">they/them</option>
              </select>
            </div>
          </>
          )
        }
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NameForm;