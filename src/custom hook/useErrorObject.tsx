import { useLocation, useNavigate } from "react-router-dom";
import { handleAxiosError, isApiError } from "../utility/validator-helper";
import { useUser } from "./useUser";
import { userInitObj } from "../service/context";
import { ApiError } from "../utility/types";
import { HttpStatusCode } from "axios";
import { ResponseStatus } from "../utility/enum";

const useErrorObject = (setError?: (key: string, message: string) => void) => { //pass a setError function as a callback

    const { setUserState, showToast } = useUser()

    const location = useLocation();
    const navigate = useNavigate();

    function changeError(er: ApiError) {
        if (isApiError(er) && setError) {
            for (let key in er.error) {
                let err = er.error[key];
                setError(key, err)
            }
        }
    }

    function handleApiError(error: unknown) {
        const er = handleAxiosError(error);
        if (isApiError(er)) {
            const statusCode = er.statusCode;
            if (statusCode === HttpStatusCode.Unauthorized || statusCode === HttpStatusCode.Forbidden) {
                const pathName = location.pathname
                if (pathName !== '/login' && pathName !== '/signup') {
                    navigate('/login', { replace: true })
                    setUserState(userInitObj)
                    showToast(ResponseStatus.Error, er.message);
                    return;
                }
            } else if (statusCode === HttpStatusCode.InternalServerError) {
                showToast(ResponseStatus.Error, er.message);
            }
        }
        changeError(er);
    }

    return handleApiError;
};

export default useErrorObject;
