// useQuery hook can be used to fetching data in react application and it done initial caching and update data automatically in background

// { -- QueryClient -- is used as importer and { -- clientProvider -- is used to use the imported data } } which is wrapped outside the 

// after using { -- usingQuery -- } we can use the imported data

// Basic approach for react query

import {useQuery} from 'react-query';
import axios from 'axios';

function RenderingValuesWithUseQuery() {
   const results = useQuery('DB-Values', () => {
    return axios.get('http://localhost:4000/values')
   })
    console.log(results)
    const { isLoading, data } = results

   if(isLoading){
       return <h2>Loading...</h2>
   }

   return(
       <>
       <h2>Rendering values using useQuery</h2>
       {data?.data.map(e => <li>{e.name}</li>)}
       </>
   )
}

export default RenderingValuesWithUseQuery;