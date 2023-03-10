import { RenderingData } from "./CustomHooks/BasePageQieryId";
import { Link } from 'react-router-dom';

const onSuccess = (data) => {
    console.log('Your code is working fine ==> ', data)
}

const onError = (err) => {
    console.log(`There's something wrong ==> `, err)
}

export const RenderingWholeSuperHero = () => {

    const { data , isLoading, isFetching, isError, error } = RenderingData(onSuccess, onError)
    console.log(data)
    
    if(isLoading || isFetching){
        return ( <h2>Loading...</h2> )
    }

    if(isError){
        return ( <h2> {error.message} </h2> )
    }

    return(
        <>
            <h2>Basic Page for rendering name as link</h2>
            {data?.data.map(e => <Link to={`query-id/${e.id}`}>{e.name}</Link>)}
        </>
    )
}

export default RenderingWholeSuperHero;