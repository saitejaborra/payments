import React from 'react';
// import {LeftNavigator, RightNavigator} from './navigators';
// import {Link} from 'react-router-dom';
const SenderDisplayed=({senderdetails, changeinstate})=>{

    return(
       
        <div className="login" >
            {/* <Link to={"/"}>&larr;</Link> */}
            {/* <Link to={"/login"}>&rarr;</Link> */}
            <h1>Sender Details</h1>
            <h4>Account No: {senderdetails.customerid} </h4>
            <h4>Account Holder: {senderdetails.holdername} </h4>
            <h4>Clear Balance: {senderdetails.accountbalance}</h4>
            <h4>OverDraft: {senderdetails.overdraft}</h4>
            <button onClick={changeinstate}>Continue</button>
            
        </div>
        )
}
export default SenderDisplayed;