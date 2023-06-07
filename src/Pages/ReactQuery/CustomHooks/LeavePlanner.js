import { useQuery, useMutation, useQueryClient } from "react-query";
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

const getLeaveDataForAdmin = async (id) => {
  return await axiosInstance.get(
    `http://localhost:5233/leave-data-admin/${id}`
  );
};

const creatingNewPassword = async (data) => {
  return await axiosInstance.post("http://localhost:5233/reset-password", data);
};

const deleteUserEventById = async (id) => {
  return await axiosInstance.delete(`http://localhost:5233/delete-event/${id}`);
};

const loginUserDetails = async (id) => {
  return await axiosInstance.get(`http://localhost:5233/login-profile/${id}`);
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
  const queryClients = useQueryClient()
  return useMutation(submittingLeaveValue,{
    onSuccess(){
      queryClients.invalidateQueries('get-leave-data-id')
    }
  });
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
      retry: false,
    }
  );
};

export const GetLeaveDataForAdmin = (id) => {
  return useQuery(
    ["get-leave-data-admin", id],
    () => getLeaveDataForAdmin(id),
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

export const LoginUserProfileDetails = (id) => {
  return useQuery("login-user-profile-details", ()=>loginUserDetails(id));
};

const updateProfile = (data)=>{
  const id = data._id;
  return axiosInstance.patch(`http://localhost:5233/update-profile/${id}`,data)
}

export const UpdateProfileDetails = (data) => {
  const queryClients = useQueryClient();
  const result = useMutation(updateProfile, {
    onSuccess() {
      queryClients.invalidateQueries("login-user-profile-details");
    },
  });
  return result;
};

const updateLeaveStatus = (data)=>{
  const id = data._id;
  return axiosInstance.patch(`http://localhost:5233/update-leave-status/${id}`,data)
}

export const UpdateLeaveStatus = (data) => {
  const queryClients = useQueryClient();
  const result = useMutation(updateLeaveStatus, {
    onSuccess() {
      queryClients.invalidateQueries("get-leave-data-id");
      queryClients.invalidateQueries("get-leave-data-admin");
    },
  });
  return result;
};