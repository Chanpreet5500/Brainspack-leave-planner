// to catch an error while fetching we can use { -- isError -- key and -- error -- key } for showing the error message

import { useQuery } from 'react-query';
import axios from 'axios';

 function HandlingQueryError() {
    const results = useQuery('Rendering-values', () => {
        return axios.get('http://localhost:4000/values')
    })

    // const results = axios.get('http://localhost:4000/values')
   

    console.log(results);
    const { isLoading, data, isError, error } = results

    if(isLoading){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }
    
    return (
        <>
        {data?.data.map(E => <li>{E.name}</li>)}
        </>
    )
}


export default HandlingQueryError;