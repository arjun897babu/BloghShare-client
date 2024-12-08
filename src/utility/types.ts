import { IUserBase } from "../pages/signup/types";
import { ResponseStatus } from "./enum";
export type ErrorObject = { [field: string]: string };

export interface ApiError extends IResponse {
  statusCode: number;
  error: ErrorObject;
}

export interface User {
  name: string;
  email: string;
  password: string;
  token: string;
  isAuthed: boolean;
  uId: string;
}

export interface Blog {
  uId: string;
  userId: string;
  title: string;
  content: string;
  file?: { publicId: string; url: string } | File; // either a string URL or a image File
}

export interface IResponse {
  status: ResponseStatus;
  message: string;
}


export interface SingleBlog extends Blog {
  user: IUserBase;
   createdAt: string;
}

export interface BlogResponse extends IResponse {
  data: {
    blog: SingleBlog;
  };
}

export interface IBlogCU extends IResponse{
  data:{
    blog:Blog
  }
}

export interface IGetAllBlogs extends IResponse {
  data: {
    blog: SingleBlog[];
    limit:number,
    totalPage:number
  };
}

export interface IToast {
  status: ResponseStatus;
  message: string;
}

export type IFilter = {
  search: string;
  pageNumber: number;
};
