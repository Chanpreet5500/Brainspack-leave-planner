import { useQuery, useMutation } from "react-query";
import axios, { AdminInstance } from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("tokenn");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

const loginUrl = (data) => {
  return axiosInstance.post("http://localhost:5233/login", data);
};

const loginAdminUrl = (data) => {
  console.log(data, "data from api function");
  return axiosInstance.post("http://localhost:5233/loginAdmin", data);
};

const registerUrl = (data) => {
  return axiosInstance.post("http://localhost:5233/register", data);
};

const registerAdminUrl = (data) => {
  return axiosInstance.post("http://localhost:5233/registerAdmin", data);
};

const dashboarUrl = (data) => {
  return axiosInstance.post("http://localhost:5233/dashboard", data);
};

const fetchingDataWithId = (id) => {
  return axiosInstance.get(`http://localhost:5233/dashboard/${id}`);
};

const submittingLeaveValue = (data) => {
  return axiosInstance.post("http://localhost:5233/leave", data);
};

const allUserData = async () => {
  return await axiosInstance.get("http://localhost:5233/statistic");
};

const postForgotEmail = async (data) => {
  return await axiosInstance.post(
    "http://localhost:5233/forgot-password",
    data
  );
};

const getLeaveDataById = async (id, userType) => {
  return await axiosInstance.get(
    `http://localhost:5233/leave-data/${id}/${userType}`
  );
};

const creatingNewPassword = async (data) => {
  return await axiosInstance.post("http://localhost:5233/reset-password", data);
};

const deleteUserEventById = async (id) => {
  return await axiosInstance.delete(`http://localhost:5233/delete-event/${id}`);
};

export const LoginData = () => {
  return useMutation(loginUrl);
};
export const LoginAdmin = () => {
  return useMutation(loginAdminUrl);
};
export const RegisterData = () => {
  return useMutation(registerUrl);
};
export const RegisterAdmin = () => {
  return useMutation(registerAdminUrl);
};
export const DashboardData = () => {
  return useMutation(dashboarUrl);
};
export const GetDashboardData = (id) => {
  return useQuery("get-Data", () => fetchingDataWithId(id), { retry: false });
};
export const LeaveValues = () => {
  return useMutation(submittingLeaveValue);
};
export const StatisticsData = () => {
  return useQuery("get-all-data", allUserData);
};

export const ForgotPasswordData = () => {
  return useMutation(postForgotEmail);
};

export const GetLeaveDataById = (id, userType) => {
  return useQuery(
    ["get-leave-data-id", id, userType],
    () => getLeaveDataById(id, userType),
    {
      refetchOnMount: true,
      retry: false
    }
  );
};

export const CreatingNewPassword = () => {
  return useMutation(creatingNewPassword);
};

export const DeleteUserEventById = () => {
  return useMutation((id) => deleteUserEventById(id));
};
