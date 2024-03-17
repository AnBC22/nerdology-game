import React from 'react'
// import './App.css'
import Loading from '../assets/loading.svg'

export default function WaitingTime() {

    const [ count, setCount ] = React.useState(5)

    /* Why am I implementing a countdown on this waiting time screen? It is because the open trivia
    database API has a restriction: you can call the API once every 5 seconds, so this is to prevent 
    the user to cause network errors due to more API calls than expected. 
    */

    React.useEffect(() => {

        const interval = setInterval(() => {
            setCount(prev => {
                if(prev < 2) {
                    clearInterval(interval)
                    return 1
                } 
                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <h1>Please wait....</h1>
            <h2>{count}</h2>
            <img src={Loading} />
        </>
    )
}