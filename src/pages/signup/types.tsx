import { IResponse, User } from "../../utility/types";

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

