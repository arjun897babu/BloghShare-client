import React from "react";
import { ResponseStatus } from "../utility/enum";
import { IToast } from "../utility/types";

const Toast: React.FC<IToast> = ({ status,message }) => {

    return (
        <>
            <div className={`toast toast-center z-1`}>
                <div className={` bg-white max-w-sm sm:max-w-xl alert  rounded-lg  flex items-center ${status === ResponseStatus.SUCCESS ? 'text-success border-success' : 'text-error border-error'}`}>
                    <span className="text-xs sm:text-sm">{message}.</span>
                </div>
            </div>
        </>
    )
}

export default Toast