
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'

function RenderingValues() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([]);   
    const [errors, setErrors] = useState('');

    useEffect(() => {
       axios.get('http://localhost:4000/values').then(res => {
           console.log(res)
        setData(res.data)
        setIsLoading(false)
       }).catch(err => {
        setErrors(err.message)
        setIsLoading(false)
       })
    }, [])

    if(isLoading){
        return <h2>...loading</h2> 
    }

    if(errors){
        return <h2>{errors}</h2>
    }

    return( 
    <>
    <h1>Values</h1>
    <ol>
  
        {data.map(e => {return( <li>{e.name}</li>)})}   

    </ol>

    </>
    )
}

export default RenderingValues;

// React Query is { --  the library -- } for { -- data fetching -- }  in React

// Why we need React Query ? 

// 1. Beacuse react is a UI library and its unable to fetch data 

// 2. useEffect hook is used for data fetching and useState hook is used to maintain component state loading


// How to Fetch data using useEffect and useState 