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

export default NameForm;