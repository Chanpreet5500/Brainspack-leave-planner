import axios from "axios";
import { useMutation, useQuery } from "react-query";

const axiosInstance = axios.create();

const fetchTimeTracker = (id) => {
  return axiosInstance.get(`http://localhost:5233/testData/${id}`);
};

export const GetUserData = (id) => {
  return useQuery("getTimeTrackerData", () => fetchTimeTracker(id), {
    retry: false,
    refetchOnWindowFocus: true,
  });
};

const fetchDataByID = (id) => {
  return axiosInstance.get(`http://localhost:5233/getDataById/${id}`);
};

export const GetDataById = (id) => {
  return useQuery("getDataById", () => fetchDataByID(id), {
    retry: false,
    refetchOnMount: true,
  });
};

export const DeleteUserData = (data) => {
  const result = useMutation(deleteApi);
  return result;
};

const fetchEditData = (id) => {
  return axiosInstance.get(`http://localhost:5233/edituserdata/${id}`, id);
};

export const EditUserData = (data) => {
  return useQuery("getEditUserData", () => fetchEditData(data), {
    retry: false,
    refetchOnMount: true,
  });
};

const postApi = (data) => {
  return axiosInstance.patch(`http://localhost:5233/update`, data);
};

export const UpdateUserData = (data) => {
  const result = useMutation(postApi);
  return result;
};

const deleteApi = (data) => {
  return axiosInstance.delete(`http://localhost:5233/delete-user/${data}`);
};
