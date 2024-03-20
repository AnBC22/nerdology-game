import React from 'react'
import Button from '../components/Button/Button'
import { Link } from "react-router-dom"

// import './App.css'

export default function Quiz({ triviaData, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)

    function insertRandom(array, newElement) {
        const randomIndex = Math.floor(Math.random() * array.length)
        const randomIndexRef = React.useRef(randomIndex)
        const newArray = array.toSpliced(randomIndexRef, 0, newElement)
        return newArray
    }

    function handleShowAnswers() {
        console.log("Show answers")
        setCheckAnswers(true)
    }

  const [minutes, setMinutes] = React.useState(1);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
          // If seconds reach 0, decrease minutes and reset seconds
          if (minutes === 0) {
            clearInterval(timer); // Stop the timer when it reaches 0:00
            return 0;
          }
          setMinutes(prevMinutes => prevMinutes - 1);
          return 59;
        }
        return prevSeconds - 1;
      });
    }, 50);
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timer);
  }, [minutes]); // Re-run effect only when minutes change


    const triviaDataHtml = triviaData.results.map((questionObj, index) => {

        const incorrectAnswers = questionObj.incorrect_answers
        
        const allAnswers = insertRandom(incorrectAnswers, questionObj.correct_answer)

        const allAnswersHtml = allAnswers.map(answer => {
            return (
                <button className="answer-button">{answer}</button>
            )
        })

        return ( //End of triviaDataHtml
            <div key={index}>
                <h2>
                    {questionObj.question}
                </h2>
                <div className="answer-buttons-container">
                    {allAnswersHtml}
                </div>
            </div>
        )
    })

    return ( //End of Quiz function
        <>
            <h2>This is the Quiz</h2>
            <h1>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
            {triviaDataHtml}
            {
                checkAnswers ?
                <Link to='/waitingtime'>
                    <Button 
                        buttonAction={handleNewDataRequest} 
                        buttonSize={'small'}
                    >
                        Play again
                    </Button> 
                </Link> 
                :

                <Button 
                    buttonAction={handleShowAnswers} 
                    buttonSize={'small'}
                >
                    Check answers
                </Button>
            }
        </>
    )
}