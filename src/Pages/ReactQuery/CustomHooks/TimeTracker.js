import axios from "axios";
import { useMutation, useQuery } from "react-query";

const axiosInstance = axios.create();

const fetchTimeTracker = (id) => {
  return axiosInstance.get(`http://localhost:5233/logged-user-data/${id}`);
};

export const GetUserData = (id) => {
  return useQuery("getTimeTrackerData", () => fetchTimeTracker(id), {
    retry: false,
    refetchOnMount: true,
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
  }-${secondTempDate.getDate()+1}`;

  return axiosInstance.get(
    `http://localhost:5233/weekly-datas/${id}/${weekFIrstDay}/${weekLastDay}`
  );
};


export const FetchFilterdWeekData = (id) => {
  return useQuery("logged-user-week-data", () => fetchWeekData(id), {
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};








const getDAta = (data) => {
  const id = data.userId;

  return axiosInstance.post(`http://localhost:5233/weekly-data/${id}`, data);
};

export const WeekyUsersData = (data) => {
  return useMutation(getDAta, {
    onSuccess: () => {
      // Success actions
      console.log("success");
    },
    onError: (error) => {
      console.log(error, "error");
      // Error actions
    },
  });
};
