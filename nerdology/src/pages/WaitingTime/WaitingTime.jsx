import React from 'react'
import Loading from '../../assets/loading.svg'
import { useNavigate } from "react-router-dom"
import './WaitingTime.css'

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
        <div id="container">
            <div class="container-inner">
                <h3 className="count">{count}</h3>
                <div className="bottom">
                    <h3 className='title'>Please wait</h3>
                    <img className="loading-img" src={Loading} />
                </div>
            </div>
        </div>
    )
}