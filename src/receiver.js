import React from 'react';
import './stylesheets/login.css';
import './stylesheets/button.css';
// import {Link} from 'react-router-dom';
const Receiver=({bicobj, authenticatebic, authenticatename, accnumbers, receiver, nameobj})=>{

    return(
    <div className="login" >
        {/* <Link to={"/senderdisplayed"}>&larr;</Link> */}
        <label for="bic" id="bic">BIC</label>
    <input type="text" placeholder="Enter BIC" onChange={bicobj} onBlur={authenticatebic} /><br/>
    <h3>Receiver Bank: {receiver.bankname==null? "Bank not found. Enter valid bic for successful transaction" : receiver.bankname} </h3>
    <label for="name" id="name">Account Holder</label>
    <input type="text" placeholder="Enter Full name" onChange={nameobj}/><br/>
    <label for="username" id="username">Account Number</label>
    <input type="text" placeholder="Enter account number" onChange={accnumbers} /><br/>
    <button onClick={authenticatename}>Next</button>
    </div>
    )
}
export default Receiver;