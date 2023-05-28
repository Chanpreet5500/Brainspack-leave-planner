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
    refetchOnMount:true,
  });
};

const fetchWeekData = (data) => {
  const id = data.userId;
  const fDay = data.weekFIrstDay.formatDate;
  const lDay = data.weekLastDay.formatDate;

  const tempDate = new Date(fDay);
  const secondTempDate = new Date(lDay);

  const weekFIrstDay = `${tempDate.getFullYear()}-${
    tempDate.getMonth() + 1
  }-${tempDate.getDate()}`;
  const weekLastDay = `${secondTempDate.getFullYear()}-${
    secondTempDate.getMonth() + 1
  }-${secondTempDate.getDate() + 1}`;

  return axiosInstance.get(
    `http://localhost:5233/weekly-datas/${id}/${weekFIrstDay}/${weekLastDay}`
  );
};

export const FetchFilterdWeekData = (id) => {
  return useQuery("logged-user-week-data", () => fetchWeekData(id), {
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

// const getDAta = (data) => {
//   const id = data.userId;

//   return axiosInstance.post(`http://localhost:5233/weekly-data/${id}`, data);
// };

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
  return axiosInstance.patch(`http://localhost:5233/updateCalendar`, data);
};

export const UpdateUserData = (id) => {
  const result = useMutation(postApi);
  return result;
};

const deleteApi = (data) => {
  return axiosInstance.delete(`http://localhost:5233/delete-user/${data}`);
};
