import React from 'react'
import Button from '../../components/Button/Button'
import { Link } from "react-router-dom"
import AnswerButton from '../../components/AnswerButton/AnswerButton'
import spinner from '../../assets/ripples.svg'
import winnerImg from '../../assets/bot-winner.png'
import Confetti from 'react-confetti'
import './Quiz.css'

export default function Quiz({ shuffledAnswers, handleNewDataRequest }) {

    const [ checkAnswers, setCheckAnswers ] = React.useState(false)
    const [ updatedTriviaData, setUpdatedTriviaData ] = React.useState(shuffledAnswers)
    const [ isTimeUp, setIsTimeUp ] = React.useState(false)
    const [ correctAnwersSelected, setCorrectAnswersSelected ] = React.useState(0)
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
                    buttonState={isTimeUp || checkAnswers ? true : false}
                    checkAnswers={checkAnswers}
                    isCorrect={isCorrect}
                    isTimeUp={isTimeUp}
                >
                    {answerObj.answer}
                </AnswerButton>
            )
        })

        return (
            <div key={questionIndex}>
                <h4>
                    {questionObj.question}
                </h4>
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
            console.log("correct answer!")
        } else {
            console.log("wrong!")
        }
    }

    function handleShowAnswers() {
        console.log("Show answers")
        setCheckAnswers(true)
    }

    React.useEffect(() => {
        const selectedAnswersArray = updatedTriviaData.map((questionObj) => {
            return questionObj.answers.map(answerObj => {
                if(answerObj.isCorrect && answerObj.on) {
                    setCorrectAnswersSelected(prev => prev + 1)
                } 
            })
        })
    }, [checkAnswers])

    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(59);

    React.useEffect(() => {

        const timer = setInterval(() => {
            if(!checkAnswers) {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        // If seconds reach 0, decrease minutes and reset seconds
                        if (minutes === 0) {
                            console.log(`0 has been reached!`)
                            setIsTimeUp(true) // CHANGE THIS TO TRUE WHEN NECESSARY
                            clearInterval(timer); // Stop the timer when it reaches 0:00
                            return 0;
                        }
                        setMinutes(prevMinutes => prevMinutes - 1);
                        return 59;
                    }
                    return prevSeconds - 1;
                });
            } else {
                clearInterval(timer)
            }
        }, 1000);

        // Cleanup function to clear interval when component unmounts
        return () => clearInterval(timer);
    }, [minutes, checkAnswers]); // Re-run effect only when minutes change 


    const [ wantsCloseModal, setWantsCloseModal ] = React.useState(false)
    function closeModal() {
        console.log("close the modal")
        setWantsCloseModal(true)
    }


    return ( //End of Quiz function
        <div id="quiz-container">
            {
                isTimeUp ? <h3 className='time-up'>Time's up!</h3> :
                <div className="timer-container">
                    <div className={checkAnswers ? 'box' : 'box-absolute'}></div>
                    <img src={checkAnswers ? '' : spinner} />
                    <h2 className={checkAnswers ? 'time time-stopped' : 'time'}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h2>
                </div> 
            }
            {triviaDataHtml}
            {
                checkAnswers ?
                <>
                    {
                        correctAnwersSelected === updatedTriviaData.length && 
                        <div>
                            <Confetti/>
                            <div className={wantsCloseModal ? 'modal modal-hidden' : 'modal'}>
                                <div className="close-modal-btn-container">
                                    <button onClick={() => closeModal()} className="modal-close-btn" id="modal-close-btn">X</button>
                                </div>
                                <div className="modal-inner" id="modal-inner">
                                    <h3>You're a true knowledge bot!</h3>
                                    <img src={winnerImg} className='bot-img bot-winner'/>
                                    <p>(This is you)</p>
                                </div>
                            </div>
                        </div> 
                    }
                    <div id="results">
                        <h4 className="score">You scored {correctAnwersSelected}/{updatedTriviaData.length} correct answers</h4>
                        <Link to='/waitingtime'>
                            <Button 
                                buttonAction={handleNewDataRequest} 
                                buttonSize={'small'}
                            >
                                Play again
                            </Button> 
                        </Link>
                    </div>
                </>
                
                :
                <div id="check-answers">
                    <Button 
                        buttonAction={handleShowAnswers} 
                        buttonSize={'small'}
                        buttonState={
                            numberAnswers === updatedTriviaData.length || isTimeUp ? false : true
                        }
                    >
                        Check answers
                    </Button>
                </div>
            }
        </div> 
    ) 
}