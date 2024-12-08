import { IResponse, User } from "../../utility/types";

export type LoginUser = Pick<User, "email" | "password">;

export const LoginObj: LoginUser = {
    email:'',
    password:''
};
export interface ILogin extends IResponse {
    data:{
      user:Pick<User,'email'|'name'|'uId'>
      token: string;
      refreshToken: string;
    }
  }