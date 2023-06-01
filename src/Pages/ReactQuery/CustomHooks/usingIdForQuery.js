import { useQuery } from 'react-query';
import axios from 'axios';

const path = (heroId) => {
    return axios.get(`http://localhost:4000/values/${heroId}`)
}

export const FinalQueryById = (heroId, onError,onSuccess) => {
     useQuery(['values', heroId], () => path(heroId), {
        onError,
        onSuccess
    })
}