// this type is used to run two or more queries in the same component

import { useQuery } from 'react-query';
import axios from 'axios';

const onSuccess = (data) => {
    console.log('Your data is running perfectly ==> ', data)
}

const onError = (err) => {
    console.log('There is something wrong ==> ', err)
}

function ParallelQuery() {

    
    const pathByName = () => {
        return axios.get('http://localhost:4000/values')
    }
    
    const pathByAddress = () => {
        return axios.get('http://localhost:4000/newValues')
    }
    
    const results = useQuery('Query-One', pathByName, {
        onSuccess,
        onError
    })
    
    const newResults = useQuery('Query-Two', pathByAddress, {
        onSuccess,
        onError
    })
    
    const { data : first  , isLoading, isFetching, isError , error} = results

    const { data: second } = newResults
    
    if(isLoading || isFetching){
        return ( <h2>Loading...</h2> )
    }
    
    if(isError){
        return ( <h2>{error.message}</h2> )
    }

    return(
        <>
        <h2>Paralell Query</h2>

        <h2>First Query</h2>
        {first?.data.map(e => <li>{e.name}</li>)}

        <h2>Second Query</h2>
        {second?.data.map(e => <li>{e.name}</li>)}
        </>
    )
}

export default ParallelQuery;