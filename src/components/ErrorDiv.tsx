import { FC } from "react"

type ErrorDivProp = {
    message: string
}

const ErrorDiv: FC<ErrorDivProp> = ({ message }) => {
    return <small
        className={`text-xs capitalize text-red-600 font-semibold absolute -bottom-6 left-2 `}
    >{message}</small>
}
export default ErrorDiv