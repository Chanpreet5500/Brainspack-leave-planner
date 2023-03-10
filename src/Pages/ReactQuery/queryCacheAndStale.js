import {useQuery} from 'react-query';
import axios from 'axios';

function IsFetchingObserve() {

    const results = useQuery('values', () => { return axios.get('http://localhost:4000/values')

        // {
        //     staleTime : 3000 // we can set the stale time { -- the time at which the data come and make result stale -- { === Default Stale time is  "   '  0 seconds  '   " =====} }
        // }

        // {
        //     Cache : 5000   // we can set the cache time after rendering it will empty  { ==== Default Cache time is " ' 5 minutes ' " =====}
        // }
    })

    console.log(results);

    const { isLoading, data, error, isError, isFetching} = results

    console.log(isLoading, isFetching) // { -- isFetching -- will work for updation in the data it will work after finishing the cache memory and automatically render it on web page}

    if(isLoading){

        return (    <h2>Loading...</h2>     )
    }

    if(isError){
        return (    <h2>{error.message}</h2>       )
    }


    return  (
        <>
            {data?.data.map(e => console.log(e))}
        </>
    )
}

export default IsFetchingObserve;