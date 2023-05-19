import { useQuery, useMutation } from "react-query";
import axios, { AdminInstance } from "axios";

const axiosInstance = axios.create();


const fetchUserData = (id) => {
    return axiosInstance.get(`http://localhost:5233/testData/${id}`);
  };

  export const GetUserData = (id) => {
    return useQuery("get-project-data", () => fetchUserData(id), { retry: false });
  };