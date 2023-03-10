import { useMutation } from 'react-query';
import axios from 'axios';

const registerPath = async (variables) => {
    console.log(variables)
    return await axios.post('http://localhost:5233/register',variables)
}

export const RegisterData = () => {
    const results =  useMutation( registerPath )
    return results;
}