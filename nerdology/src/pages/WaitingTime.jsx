import React from 'react'
// import './App.css'
import Loading from '../assets/loading.svg'

export default function WaitingTime() {


    return (
        <>
            <img src={Loading} />
            <h1>Please wait....</h1>
        </>
    )
}