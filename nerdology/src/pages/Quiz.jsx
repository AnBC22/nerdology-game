import React from 'react'
import Button from '../components/Button'

export default function Quiz() {

    const triviaURL = 'https://opentdb.com/api.php?amount=3&difficulty=easy'

    // const [ startGame, setStartGame ] = React.useState(false)
    // const [ startNewGame, setStartNewGame ] = React.useState(false)
    // const [ waitingTime, setWaitingTime ] = React.useState(false)
    // const [ checkAnswers, setCheckAnswers ] = React.useState(false)

    const [ triviaData, setTriviaData ] = React.useState(null)
    
    let pageLoaded = true

/*
    function handleStartGame() {
        console.log('Game started')
        setStartGame(prev => !prev)
      }
    
      function handleStartNewGame() {
        setWaitingTime(true)
        setTimeout(() => {
          setStartNewGame(prev => !prev)
        }, 4000)
    
        setTimeout(() => {
          handleWaitingTime()
        }, 5100)
      }
    
      function handleWaitingTime() {
        setWaitingTime(false)
      }
*/


    React.useEffect(() => {
        async function getQuestionsData() {
    
          try {
            const response = await fetch(triviaURL)
            if(!response.ok) {
              throw new Error('Network response failed')
            }
            const data = await response.json()
            setTriviaData(data)
          }
    
          catch(error) {
            console.error('Error fetching trivia data:', error.message)
            alert("There was an error fetching data for the quiz")
          }
    
        }
        if(pageLoaded) {
          getQuestionsData()
        }
    
        pageLoaded = false
    
      }, [])


    function insertRandom(array, newElement) {
        const randomIndex = Math.floor(Math.random() * array.length)
        const randomIndexRef = React.useRef(randomIndex)
        const newArray = array.toSpliced(randomIndexRef, 0, newElement)
        return newArray
    }

    /*

    function handleShowAnswers() {
        console.log("Show answers")
        setCheckAnswers(true)
    }

    */

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




    const [ xx, setXx ] = React.useState(null)

    React.useEffect(() => {
        let triviaDataHtml = null

        if(triviaData) {
            triviaDataHtml = triviaData.results.map((questionObj, index) => {

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
        }

        setXx(triviaDataHtml)
    }, [triviaData])


    return ( //End of Quiz function
        <>
            <h2>This is the Quiz</h2>
            <h1>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</h1>
            {xx}
            
            <Button 
                buttonAction={null} 
                buttonText={'Play again'}
                buttonSize={'small'}
            >
                Play again
            </Button> 

            <Button 
                buttonAction={null} 
                buttonText={'Check Answers'}
                buttonSize={'small'}
            >
                Check answers
            </Button>
            
        </>
    )
}