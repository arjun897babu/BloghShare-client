import React from "react"

type LableProps = {
    label: string
}

const Label: React.FC<LableProps> = ({ label }) => {
    return <label htmlFor={label}className="label capitalize font-semibold">{label}</label>
}
export default Label