function Result({ data }) {
    return (
      <div>
      { (data.result_a && data.result_b) ? (
        <p>Both parties have completed!</p>
      ) : (
        <>
          <p>Well done {data.name_a}! Now send this link to {data.name_b}</p>
          <p><a href={`/?name=${data.id}`}>Link</a> </p>
        </>
      )}
      </div>
    )
  }

export default Result;