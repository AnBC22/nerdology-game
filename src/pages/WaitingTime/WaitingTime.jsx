import React from 'react'
import Loading from '../../assets/loading.svg'
import { useNavigate } from "react-router-dom"
import './WaitingTime.css'

export default function WaitingTime() {

    const [ count, setCount ] = React.useState(3)

    const navigate = useNavigate()

    React.useEffect(() => {

        const interval = setInterval(() => {
            setCount(prev => {
                if(prev === 1) {
                    clearInterval(interval)
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
            <div className="container-inner">
                <h3 className="count">{count}</h3>
                <div className="bottom">
                    <h3 className='title waiting-text'>Please wait</h3>
                    <img className="loading-img" src={Loading} />
                </div>
            </div>
        </div>
    )
}