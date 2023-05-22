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

const fetchEditData = (id) => {
  return axiosInstance.get(`http://localhost:5233/edituserdata/${id}`,id);
};

export const EditUserData = (data) => {
  
  return useQuery("getEditUserData", () => fetchEditData(data), {
    retry: false,
  });
};

const postApi =(data) => {
  return axiosInstance.patch(`http://localhost:5233/update`,data)
}

export const UpdateUserData = (data) => {
  // return useMutation("postuserdata", () => postApi(data), {
  //   retry: false,
  // });

  const result = useMutation(postApi);
  return result
};

const deleteApi =(data) => {
  console.log(data)
  return axiosInstance.delete(`http://localhost:5233/delete-user/${data}`)
}

export const DeleteUserData = (data) => {
  // console.log(data)
  const result = useMutation(deleteApi);
  return result
};
