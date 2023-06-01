import { useQuery } from 'react-query';
import axios from 'axios';

function DataTransformation() {

    const path = () => {
        return axios.get('http://localhost:4000/values')
    }

    const results = useQuery(
        'values',
        path,
        {
        select : (data) => {        // here we are using {  ===  select ===    } beacuse we want to                             transform   our data and initially set it into the only showing name type
            const names = data?.data.map(e => e.name)
            return names
                        }
        })

    const { isLoading, isError, error, isFetching, data } = results

    if(isLoading || isFetching){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }

    return (

        <>
            <h2>Data Trasnformation using select </h2>
            {data.map(name => <li>{name}</li>)}
        </>
    )
}

export default DataTransformation;