import React from 'react'
import Button from '../components/Button/Button'
import { Link } from "react-router-dom"
import AnswerButton from '../components/AnswerButton/AnswerButton'

export default function Quiz({ triviaData, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)
    
    const triviaDataHtml = triviaData.results.map((questionObj, questionIndex) => {

        const incorrectAnswers = questionObj.incorrect_answers
        const correctAnswer = questionObj.correct_answer

        const answerButtonComponents = getAnswerButtonComponents(incorrectAnswers, correctAnswer)

        return (
            <div key={questionIndex}>
                <h2>
                    {questionObj.question}
                </h2>
                <div className="answer-buttons-container">
                    {answerButtonComponents}
                </div>
            </div>
        )
    })

    function getAnswerButtonComponents(array, element) {
        const incorrectAnswers = array.map((incorrectAnswer, incorrectAnswerIndex) => {
            return (
                <AnswerButton
                    key={incorrectAnswerIndex}
                    clicked={() => handleClickedAnswer(false)}
                >
                    {incorrectAnswer}
                </AnswerButton>
            )
        })

        const correctAnswer = (
            <AnswerButton
                key={3}
                clicked={() => handleClickedAnswer(true)}
            >
                {element}
            </AnswerButton>
        )

        return getCombinedComponents(incorrectAnswers, correctAnswer)
    }

    function getCombinedComponents(array, element) {
        const randomquestionIndex = Math.floor(Math.random() * (array.length + 1))
        const randomquestionIndexRef = React.useRef(randomquestionIndex)
        const combinedComponents = array.toSpliced(randomquestionIndexRef.current, 0, element)
        return combinedComponents
    }

    function handleClickedAnswer(isCorrect) {
        if(isCorrect) {
            console.log('Congratulations')
        } else {
            console.log('Wrong answer')
        }
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