import axios from "axios";
import { useQuery } from "react-query";

 const loggedUserData = async (id) => {
    console.log(id,"QUERY FUNCTION ACTIVATED")
    try {
      const { data } =  await axios.get(`http://localhost:5233/logged-user-data/${id}`)
      
      return data;
    } catch (error) {
        throw error("Unable to fetch Post");
    }
  }

export const GetUserLoggedData = (id)=>{
    return useQuery('DATA', ()=>loggedUserData(id))
}


