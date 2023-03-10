import { CustomHooks } from "./CustomHooks/hooks"

const onError = (err) => {
    console.log('There is something wrong please check this ==> ', err)
}

const onSuccess = (data) => {
    console.log('Here everything alright ==> ', data)
}


const CustomhookParent = () => {
        
    const { data ,isLoading, isFetching, isError, error} = CustomHooks(onError, onSuccess)
    
    if(isLoading || isFetching){
        return ( <h2>Loading...</h2> )
    }
    
if(isError){
    return ( <h2>{error.message}</h2> )
}

return (
<>
    <h2>Custom Ho. ok Parent</h2>
    {data.map(name => <li>{name}</li>)}
</>
)

}

export default CustomhookParent;