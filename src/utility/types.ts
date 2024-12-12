import { InputHTMLAttributes } from "react";
import { BtnSize, InputText, LoaderType, ResponseStatus } from "../constants/enum";

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

export interface IBlogCU extends IResponse {
  data: {
    blog: Blog
  }
}

export interface IGetAllBlogs extends IResponse {
  data: {
    blog: SingleBlog[];
    limit: number,
    totalPage: number
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
export type IBlogCardListpProps = {
  blogData: SingleBlog;
  deleteCB: (blogId: string) => void
}

export type ErrorDivProp = {
  message: string
}

export type ImageUploadProps = {
  changeImage: (file: File) => void;
  url?: string
}

export type LableProps = {
  label: string
}

export type PaginationProps = {
  pageNumber: number,
  changePage: (newPage: number) => void;
  totalPage: number
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  text: InputText
}

export type BlogStateType = Pick<Blog, "content" | "title" | "file">;

export const BlogInitialState: BlogStateType = {
  content: "",
  title: "",
};


/*********************
      user sign up
 *********************/
export type SingupUser = Pick<User, 'email' | 'password' | 'name'> & { confirm_password: string };
export type IUserBase = Pick<User, "name" | "email" | "uId">
export const signupObj: SingupUser = {
  email: '',
  password: '',
  confirm_password: '',
  name: ''
}

export interface ICreateUser extends IResponse {
  data: IUserBase
}

/*********************
      user log in
 *********************/
export type LoginUser = Pick<User, "email" | "password">;

export const LoginObj: LoginUser = {
  email: '',
  password: ''
};
export interface ILogin extends IResponse {
  data: {
    user: Pick<User, 'email' | 'name' | 'uId'>
    token: string;
    refreshToken: string;
  }
}


export type IButtonLoaderProps = {
  btnSize: BtnSize,
  loader: LoaderType
}
