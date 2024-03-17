import React from 'react'
import Button from '../components/Button'
import GameOver from './GameOver'

// import './App.css'

export default function Quiz({ triviaData, handleStartNewGame }) {

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
    }, 1000);
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timer);
  }, [minutes]); // Re-run effect only when minutes change




    const triviaDataHtml = triviaData.results.map((questionObj, index) => {

        const incorrectAnswers = questionObj.incorrect_answers
        
        const allAnswers = insertRandom(incorrectAnswers, questionObj.correct_answer)

        const allAnswersHtml = allAnswers.map(answer => {
            return (
                <p>{answer}</p>
            )
        })

        return ( //End of triviaDataHtml
            <div key={index}>
                <h2>
                    {questionObj.question}
                </h2>
                {allAnswersHtml}
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
                <Button 
                    buttonAction={handleStartNewGame} 
                    buttonText={'Play again'}
                    buttonSize={'small'}
                >
                    Play again
                </Button> :

                <Button 
                    buttonAction={handleShowAnswers} 
                    buttonText={'Check Answers'}
                    buttonSize={'small'}
                >
                    Check answers
                </Button>
            }
        </>
    )
}