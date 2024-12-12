import React, { forwardRef } from "react"
import { InputProps } from "../utility/types"

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
    ({ text, ...props }, ref) => {
        return <input ref={ref} name={text} type={text==='email'?'email':'text'} {...props} className="input focus:outline-none bg-gray-50 border border-gray-200  " />
    }
)


export default Input