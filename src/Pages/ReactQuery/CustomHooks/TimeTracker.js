import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const axiosInstance = axios.create();

const fetchTimeTracker = (id) => {
  return axiosInstance.get(`http://localhost:5233/getTimeTrackerData/${id}`);
};

export const GetUserData = (id) => {
  return useQuery("getTimeTrackerData", () => fetchTimeTracker(id), {
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

const fetchWeekData = (data) => {
  const id = data.userId;
  const fDay = data.weekFIrstDay.formatDate;
  const lDay = data.weekLastDay.formatDate;

  const tempDate = new Date(fDay);
  const secondTempDate = new Date(lDay);
  secondTempDate.setDate(secondTempDate.getDate() + 1);

  const weekFIrstDay = `${tempDate.getFullYear()}-${
    tempDate.getMonth() + 1
  }-${tempDate.getDate()}`;
  const weekLastDay = `${secondTempDate.getFullYear()}-${
    secondTempDate.getMonth() + 1
  }-${secondTempDate.getDate()}`;

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

const fetchDataByID = (id) => {
  return axiosInstance.get(`http://localhost:5233/getDataById/${id}`);
};

export const GetDataById = (id) => {
  return useQuery("getDataById", () => fetchDataByID(id), {
    retry: false,
    refetchOnMount: true,
  });
  // refetchInterval:2000,
};

const fetchEditData = (id) => {
  return axiosInstance.get(`http://localhost:5233/edituserdata/${id}`, id);
};

export const DeleteUserData = (data) => {
  const result = useMutation(deleteApi);
  return result;
};

//

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
  return axiosInstance.delete(`http://localhost:5233/deleteTimeTrackerData/${data}`);
};

const updateProjectStatus = (data) => {
  const { id } = data;
  return axiosInstance.patch(`http://localhost:5233/updateStatus/${id}`, data);
};

export const UpdateStatus = (data) => {
  const queryClients = useQueryClient();
  const result = useMutation(updateProjectStatus, {
    onSuccess() {
      queryClients.invalidateQueries("logged-user-week-data");
    },
  });
  return result;
};
