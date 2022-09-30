import React from "react";
import "./stylesheets/error.css";
const Error=({message, resetstate})=>{
    return(
    <div className="error">
    <h2>{message.includes("completed successfully") ? "Congrats":"Error"}  </h2>
    <p>{message}</p>
    <button onClick={resetstate}>Okay</button>
    </div>
    )
}
export default Error;