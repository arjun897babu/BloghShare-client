import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    text: "password" | "confirm_password";
};

const Password = forwardRef<HTMLInputElement, InputProps>(({ text, ...props }, ref) => {
    return (
        <input
            ref={ref}
            name={text}
            type='password'
            className="input focus:outline-none bg-gray-50 border border-gray-200"
            {...props}
        />
    );
});

export default Password;
