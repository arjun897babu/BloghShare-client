import { useContext } from "react";
import { UserContext, UserContextType } from "../service/context";

export const useUser = (): UserContextType => {
    const userObj = useContext(UserContext);
    if (!userObj) {
        throw Error('context not available in this child')
    }
    return userObj
}
