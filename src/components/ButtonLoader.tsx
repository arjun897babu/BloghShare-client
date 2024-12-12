import { FC } from "react"
import { LoaderType } from "../constants/enum"
import { IButtonLoaderProps } from "../utility/types"


export const ButtonLoader: FC<IButtonLoaderProps> = ({ btnSize, loader }) => {
    return loader === LoaderType.PROGRESS ?
        (<progress className={`progress w-${btnSize}`}></progress>)
        : (<span className={`loading loading-spinner loading-${btnSize}`}></span>)
}