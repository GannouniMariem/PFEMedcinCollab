import axios from "axios";
import CONFIG from "../config";

export const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
});


/**
 * Handle Axios requests and put auth token in headers
 */
api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    console.log("error",error.response.data)
  }
);

/**
 * Handle Axios response errors
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response?.data) {
        console.log('error.response',error.response?.data)
    // if(error.response?.data === "expiredToken" && !tokenExpiredAlertShown) {
    //   tokenExpiredAlertShown = true;
    //   alert("experied token login again")
      window.localStorage.clear()
      window.location.href = "/login"
    }
    return Promise.reject(error);
  }
);
