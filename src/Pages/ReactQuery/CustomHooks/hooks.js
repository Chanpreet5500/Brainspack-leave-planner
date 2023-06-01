import { useQuery } from 'react-query';
import axios from 'axios';

const path = () => {
    return axios.get('http://localhost:4000/values')
}

export const CustomHooks = (onSuccess, onError) => {
   return useQuery(
       'values', 
       path,
       { 
           onError,
           onSuccess,
           select : (data) => {
           const firstName = data?.data.map(e => e.name)
           return firstName
       }} )
}