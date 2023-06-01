import { FinalQueryById } from "./CustomHooks/usingIdForQuery";
// import { Link } from 'react-router-dom'

const onError = (err) => {
    console.log('There is something wrong please check this ==> ', err)
}

const onSuccess = (data) => {
    console.log('Here everything alright ==> ', data)
}


const CustomhookParentById = () => {
        
    const { data ,isLoading, isFetching, isError, error} = FinalQueryById(onError, onSuccess)
    
    if(isLoading || isFetching){
        return ( <h2>Loading...</h2> )
    }
    
if(isError){
    return ( <h2>{error.message}</h2> )
}

return (
    <>
        <h2>Show Data Of Query By its ID</h2>
        {/* { data?.data(e => <Link to={`/query-id/${e.id}`}>{e.name}</Link>)} */}
        {data?.data.map(e => <li>{e.name}= {e.location}</li>)}
    </>
)

}


export default CustomhookParentById;