import React from 'react'
import Loading from '../assets/loading.svg'
import { useNavigate } from "react-router-dom"

export default function WaitingTime() {

    const [ count, setCount ] = React.useState(5)

    const navigate = useNavigate()

    React.useEffect(() => {

        const interval = setInterval(() => {
            setCount(prev => {
                if(prev === 1) {
                    clearInterval(interval)
                    console.log("Reached 1")

                    setTimeout(() => {
                        navigate("/quiz")
                    }, 100)
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