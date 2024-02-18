import React from "react"
const Button =(props) =>{
    const {label} = props
    return(
        <div>
            <button className="btn btn-success">{label}</button>
        </div>
    )
}
export default Button