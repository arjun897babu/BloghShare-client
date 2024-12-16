import axios, { HttpStatusCode } from "axios";
import { CustomError } from "../utility/api-error-helper";
import { apiEndPoint, VITE_API_ROUTE, VITE_APP } from "../constants/endpoints";
import { User } from "../utility/types";

const serverInstance = axios.create({
  baseURL: VITE_API_ROUTE,
  timeout: 6 * 1000,
});

const authInstance = axios.create({
  baseURL: VITE_API_ROUTE,
  timeout: 6 * 1000,
});

serverInstance.interceptors.request.use(
  function (config) {
    const blogshareData = localStorage.getItem(VITE_APP);
    const token = blogshareData ? JSON.parse(blogshareData).token : undefined;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    return Promise.reject(
      new CustomError(HttpStatusCode.Unauthorized, { token: "no token found" })
    );
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

serverInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && originalRequest && error.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = (await authInstance.post(apiEndPoint.refresh,{},{withCredentials:true})).data
        
        const storedData: User = JSON.parse(localStorage.getItem(VITE_APP)!);
        localStorage.setItem(
          VITE_APP,
          JSON.stringify({ ...storedData, token:response.data.token })
        );

        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;;
        return serverInstance(originalRequest)
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

export function debounce(func: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export { serverInstance, authInstance };