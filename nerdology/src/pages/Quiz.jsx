import React from 'react'
import Button from '../components/Button/Button'
import { Link } from "react-router-dom"
import { set } from 'lodash'
import AnswerButton from '../components/AnswerButton/AnswerButton'

export default function Quiz({ triviaData, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)
    const [ numberOfCorrectAnswers, setNumberOfCorrectAnswers ] = React.useState(0)


    //Remember, the idea in this branch is that the user is only able to select one answer per question.

    function handleCorrectAnswerSelected() {
        setNumberOfCorrectAnswers(prevAnswers => prevAnswers + 1)
    }


    function handleClickedAnswer(responseValidity) {
        if(responseValidity === 'correct') {
            console.log('Congratulations')
        } else {
            console.log('Wrong answer')
        }
    }

    function insertRandom(array, newElement) {
        const incorrectAnswersHtml = array.map((incorrectAnswer, incorrectAnswerIndex) => {

            return (
                <AnswerButton
                    clicked={() => handleClickedAnswer('incorrect')}
                >
                    {incorrectAnswer}
                </AnswerButton>
            )
        })

        const correctAnswerHtml = (
            <AnswerButton
                clicked={() => handleClickedAnswer('correct')}
            >
                {newElement}
            </AnswerButton>
        )
        const randomquestionIndex = Math.floor(Math.random() * (incorrectAnswersHtml.length + 1))
        const randomquestionIndexRef = React.useRef(randomquestionIndex)
        const newArray = incorrectAnswersHtml.toSpliced(randomquestionIndexRef.current, 0, correctAnswerHtml)
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


    const triviaDataHtml = triviaData.results.map((questionObj, questionIndex) => {

        const incorrectAnswers = questionObj.incorrect_answers
        
        const allAnswers = insertRandom(incorrectAnswers, questionObj.correct_answer)

        /*
        const allAnswersHtml = allAnswers.map(answer => {
            return (
                <button className="answer-button">{answer}</button>
            )
        })
        */

        return ( //End of triviaDataHtml
            <div key={questionIndex}>
                <h2>
                    {questionObj.question}
                </h2>
                <div className="answer-buttons-container">
                    {allAnswers}
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