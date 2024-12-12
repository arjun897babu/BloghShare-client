import React from "react"
import { LableProps } from "../utility/types"

const Label: React.FC<LableProps> = ({ label }) => {
    return <label htmlFor={label}className="label capitalize font-semibold">{label}</label>
}
export default Label