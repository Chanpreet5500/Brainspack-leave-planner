import axios from 'axios';
import { useQuery } from 'react-query';

const path = () => { 
    return axios.get('http://localhost:4000/values') 
}

export const RenderingData = (onSuccess, onError) => {

    return useQuery('rendering-values',path,{
        onSuccess,
        onError
    })

}