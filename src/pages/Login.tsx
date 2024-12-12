import { Link, useNavigate } from "react-router-dom"
import Password from "../components/Password"
import Label from "../components/Label"
import Input from "../components/Input"
 import { useZodForm } from "../custom hook/UseZodForm"
import { loginSchema, logniFormSchemaType } from "../utility/zodSchem"
import ErrorDiv from "../components/ErrorDiv"
import useErrorObject from "../custom hook/useErrorObject"
import { authInstance } from "../service/api"
import { BtnSize, InputText, LoaderType, ResponseStatus } from "../constants/enum"
import { useUser } from "../custom hook/useUser"
import { useEffect, useState } from "react"
import { ButtonLoader } from "../components/ButtonLoader"
import Toast from "../components/Toast"
import { ILogin, LoginObj } from "../utility/types"
import { apiEndPoint } from "../constants/endpoints"


function Login() {


    const { userState, setUserState, toast } = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if (userState.isAuthed) {
            navigate('/', { replace: true })
        }
    }, []);

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setError, formState: { errors } } = useZodForm(loginSchema, LoginObj)

    function changeErrorCB(key: string, message: string) {
        setError(key as keyof logniFormSchemaType, { message })
    }

    const handleApiError = useErrorObject(changeErrorCB)

    async function onSubmit(data: logniFormSchemaType) {
        setLoading(true)
        try {
            const response = (await authInstance.post<ILogin>(apiEndPoint.login, data)).data
            if (response.status === ResponseStatus.SUCCESS) {
                const { user, token } = response.data
                setUserState((prev) => ({
                    ...prev,
                    email: user.email,
                    name: user.name,
                    token: token,
                    uId: user.uId,
                    isAuthed: true
                }));
                navigate('/', { replace: true })
            }
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }
    }

    if (userState.isAuthed) {
        return null;
    }

    return (
        <>
            <div className="py-6 sm:py-8 lg:py-10">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>
                    <form
                        className="mx-auto max-w-lg rounded-lg border"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 p-4 md:p-8">
                            <div className="form-control relative ">
                                <Label label="email" />
                                <Input text={InputText.EMAIL} {...register('email')} />
                                {errors && errors.email?.message && <ErrorDiv message={errors.email.message} />}
                            </div>
                            <div className="form-control relative ">
                                <Label label="password" />
                                <Password text="password" {...register('password')} />
                                {errors && errors.password?.message && <ErrorDiv message={errors.password.message} />}
                            </div>
                            <button className={`btn btn-neutral mt-5`} type="submit">{loading ? <ButtonLoader btnSize={BtnSize.SM} loader={LoaderType.SPINNER} /> : 'Log in'}</button>
                            {/* <progress className="progress "></progress> */}
                            <div className="divider"></div>
                        </div>

                        <div className="flex items-center justify-center bg-gray-100 p-4">
                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?
                                <Link to={'/signup'}>
                                    <span className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
                                        Register
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
                {
                    toast &&
                    <Toast message={toast.message} status={toast.status} />
                }
            </div>
        </>
    )
}


export default Login