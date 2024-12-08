import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/Password";
import Label from "../../components/Label";
import Input from "../../components/Input";
import { ICreateUser, signupObj } from "./types";
import { useZodForm } from "../../custom hook/UseZodForm";
import { signUpFormSchemaType, signupSchema } from "../../utility/zodSchem";
import ErrorDiv from "../../components/ErrorDiv";
import { authInstance, endPoint } from "../../service/api";
import { ResponseStatus } from "../../utility/enum";
import useErrorObject from "../../custom hook/useErrorObject";
import { useUser } from "../../custom hook/useUser";
import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { ButtonLoader } from "../../components/ButtonLoader";


function Signup() {

    const navigate = useNavigate();
    const { userState, toast } = useUser()
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setError, formState: { errors } } = useZodForm(signupSchema, signupObj)

    function changeErrorCB(key: string, message: string) {
        setError(key as keyof signUpFormSchemaType, { message })
    }

    const handleApiError = useErrorObject(changeErrorCB)

    const onSubmit = async (data: signUpFormSchemaType) => {
        setLoading(true)
        try {
            const response = (await authInstance.post<ICreateUser>(endPoint.signup, data)).data
            if (response.status === ResponseStatus.SUCCESS) {
                navigate('/login')
            }
        } catch (error) {
            handleApiError(error)
        } finally {
            setLoading(false)
        }

    };

    useEffect(() => {
        if (userState.isAuthed) {
            navigate('/', { replace: true })
        }
    }, [])


    if (userState.isAuthed) {
        return null;
    }


    return (
        <div className="py-6 sm:py-8 lg:py-10">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Sign Up</h2>
                <form
                    className="mx-auto max-w-lg rounded-lg border"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-4 p-4 md:p-8">
                        <div className="form-control relative">
                            <Label label="name" />
                            <Input text="text" {...register('name')} />
                            {errors && errors.name?.message && <ErrorDiv message={errors.name.message} />}
                        </div>
                        <div className="form-control relative">
                            <Label label="Email" />
                            <Input text="email" {...register('email')} />
                            {errors && errors.email?.message && <ErrorDiv message={errors.email.message} />}
                        </div>
                        <div className="form-control relative">
                            <Label label="Password" />
                            <Password text="password"  {...register('password')} />
                            {errors && errors.password?.message && <ErrorDiv message={errors.password.message} />}
                        </div>

                        <div className="form-control relative">
                            <Label label="Confirm Password" />
                            <Password text="confirm_password" {...register('confirm_password')} />
                            {errors && errors.confirm_password?.message && <ErrorDiv message={errors.confirm_password.message} />}
                        </div>

                        <button className="btn btn-neutral w-full mt-4" type="submit">
                            {loading ? <ButtonLoader btnSize="sm" loader="spinner" /> : 'Sign Up'}
                        </button>
                        <div className="divider my-4"></div>
                    </div>

                    <div className="flex items-center justify-center bg-gray-100 p-4">
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link to="/login">
                                <span className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">
                                    Login
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
    );
}

export default Signup;
