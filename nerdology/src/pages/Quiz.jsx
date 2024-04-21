import React from 'react'
import Button from '../components/Button/Button'
import { Link } from "react-router-dom"
import AnswerButton from '../components/AnswerButton/AnswerButton'

export default function Quiz({ shuffledAnswers, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)
    const [ updatedTriviaData, setUpdatedTriviaData ] = React.useState(shuffledAnswers)

    const [ numberAnswers, setNumberAnswers ] = React.useState(0)

    const triviaDataHtml = updatedTriviaData.map((questionObj, questionIndex) => {

        const answerButtonComponents = questionObj.answers.map((answerObj, index) => {

            const currentQuestion = questionObj.question
            const isCorrect = answerObj.isCorrect
            const id = answerObj.id
            const on = answerObj.on

            return (
                <AnswerButton
                    key={index}
                    clicked={() => handleClickedAnswer(isCorrect, currentQuestion, id)}
                    on={on}
                >
                    {answerObj.answer}
                </AnswerButton>
            )
        })

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


    React.useEffect(() => {
        /*
        What this useEffect does is to enabled the 'checkAnswers' button only when the user 
        has selected one answer per each question, otherwise it will keep the button disabled. The 
        useEffect will work only when the updatedTriviaData has changed.
        */

        /*
        This map function maps through the updatedTriviaData objects and arrays to find all the 
        answers that has been clicked
        */
        const selectedAnswersArray = updatedTriviaData.map((questionObj) => {
            return questionObj.answers.map(answerObj => {
                const isSelectedAnswer = answerObj.on ? true : false
                return isSelectedAnswer
            })
        })
        .flat()
        .filter(selectedAnswer => selectedAnswer === true)

        setNumberAnswers(selectedAnswersArray.length)
        
    }, [updatedTriviaData])

    function handleClickedAnswer(isCorrect, currentQuestion, id) {

        setUpdatedTriviaData(prevData => {

            return prevData.map(questionObj => {
                if(questionObj.question === currentQuestion) {
                    return (
                        {
                            ...questionObj,
                            answers: questionObj.answers.map(answer => {
                                if(answer.id === id) {
                                    console.log(`${answer.answer} was clicked!`)
                                    return (
                                        {
                                            ...answer,
                                            on: !answer.on
                                        }
                                    )
                                } 
                                else {
                                    return (
                                        {
                                            ...answer,
                                            on: false
                                        }
                                    )
                                }
                            })
                        }
                    )
                }
                else {
                    return questionObj
                }
            })
        })

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
                    buttonState={numberAnswers === 3 ? false : true}
                >
                    Check answers
                </Button>
            }
        </> 
    ) 
}