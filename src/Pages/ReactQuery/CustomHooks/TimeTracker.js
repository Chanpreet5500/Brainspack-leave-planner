import axios from "axios";
import { useMutation, useQuery } from "react-query";

const axiosInstance = axios.create();

const fetchTimeTracker = (id) => {
  return axiosInstance.get(`http://localhost:5233/testData/${id}`);
};

export const GetUserData = (id) => {
  return useQuery("getTimeTrackerData", () => fetchTimeTracker(id), {
    retry: false,
  });
};

const fetchDataByID = (id) => {
  return axiosInstance.get(`http://localhost:5233/getDataById/${id}`);
};

export const GetDataById = (id) => {
  return useQuery("getDataById", () => fetchDataByID(id), {
    retry: false,
  });
};

const deleteApi = (data) => {
  console.log(data);
  return axiosInstance.delete(`http://localhost:5233/delete-user/${data}`);
};

export const DeleteUserData = (data) => {
  // console.log(data)
  const result = useMutation(deleteApi);
  return result;
};
