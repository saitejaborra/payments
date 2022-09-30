import axios from "axios";
import React,{useState} from "react";
import ReactDOM from "react-dom";

import './stylesheets/dashboard.css';

let top5details=[];
const fetchtopfive=()=>{
    axios.get("http://localhost:8082/beneficiary/fetchfive")
    .then((response)=>{
       top5details=response.data;
       console.log("1");
    }
    ).catch((e)=>console.log(e));   //implemented to get top5 details for dashboard
}
fetchtopfive();
const renderit=()=>{
    return(
    top5details.map((data)=>{
        return <h2 className="dashboardchildbox">{data.bankname} with BIC {data.ifsc} has received total {data.transprocessed} transactions</h2> })   
    )}
const Dashboard=()=>{
    return(
        <div className="dashboardbox">
        <h1>Top 5 bank remittances</h1>
       {
        renderit()
        }
       </div>
    )
}
export default Dashboard;