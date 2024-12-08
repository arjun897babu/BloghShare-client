import axios, { HttpStatusCode } from "axios";
import { CustomError } from "../utility/validator-helper";

const { VITE_API_ROUTE, VITE_APP } = import.meta.env;

export const endPoint = {
  login: "/auth/login",
  signup: "/auth/signup",
  logout: "/auth/logout",
  blogs: "/blogs",
  singleBlog: (blogId: string) => `/blogs/blog/${blogId}`,
  write: "/blogs/user/blog", //create specif to user
  getUserBlog: "/blogs/user/blog",
  editBlog: (blogId: string) => `/blogs/user/${blogId}`, //edit and delete a specif blog
};

const serverInstance = axios.create({
  withCredentials: true,
  baseURL: VITE_API_ROUTE,
  timeout: 6 * 1000,
});

const authInstance = axios.create({
  withCredentials: true,
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

export function debounce(func: Function, delay: number) {
  let timeout:any;

  return function(...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}


export { serverInstance, authInstance };
