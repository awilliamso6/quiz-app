import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/quiz');
    };

    return (
        <div>
            <p>Just a fun little quiz</p>
            <p>Better proper introduction here</p>
            <p>Button to start quiz ^---^</p>
            <button onClick={handleClick}>Take Quiz</button>
        </div>
    )
}

export default Home;