// here we get data after click on the refetch me button with using { -- refetch -- from the api response and using -- enabled : false -- which will help to hide the fetched data on component mount }

import { useQuery } from 'react-query'; 

import axios from 'axios';

function GetDataOnClick () {

    const output = () => {
       return axios.get('http://localhost:4000/values')
    }

    const results = useQuery('get-Data',output,
        {
            enabled : false
        }
    )

    console.log(results);

    const {isLoading, isError, error, data, isFetching, refetch} = results

    if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }

    return(

        <>
            <h2>Data show after clicking Refetch</h2>

            <button onClick={refetch} >Refetch me</button>

            {data?.data.map(e => <li>{e.name}</li>)}


        </>

    )
}

export default GetDataOnClick;