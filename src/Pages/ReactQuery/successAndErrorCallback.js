import { useQuery } from 'react-query';
import axios from 'axios';

function SuccessAndFailure () {

    const path = () => {
        return axios.get('http://localhost:4000/values')
    }

    const onSuccess = (data) => {
        console.log('Your API is working perfectly and your data is ==> ', data)
    }

    const onError = (error) => {
        console.log("There's something wrong please check this ==> ", error, error.message)
    }

    const results = useQuery(
        'values',
        path,
        {
            onSuccess,
            onError
        })

    const { isLoading, isFetching, isError, data, error } = results;

    if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }

    return (
        <>
        <h2>Using On Success and On Error</h2>
        {data?.data.map(e => <li>{e.name}</li>)}
        </>
    )

}

export default SuccessAndFailure;