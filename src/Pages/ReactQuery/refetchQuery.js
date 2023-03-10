import {useQuery} from 'react-query';
import axios from 'axios';

function RefetchOnMounting() {

    const results = useQuery('values', () => {
         return axios.get('http://localhost:4000/values')
        })

        console.log(results)

        const { isLoading, data, isError, error } = results

        if(isLoading){
            return ( <h2>Loading..</h2> )
        }

        if(isError) {
            return ( <h2>{error.message}</h2> )
        }

        return (

            <>
            
            <h2>Displaying Values with REFETCH ON MOUNT </h2>

            {  data?.data.map(e => <li>{e.name}</li>) }
            </>
        
        )
}

export default RefetchOnMounting;