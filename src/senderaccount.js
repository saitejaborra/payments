import React from 'react';
// import { Link ,BrowserRouter as Router, useNavigate,useParams } from 'react-router-dom';
import "./stylesheets/button.css";

function SenderAccount({authenticatenumber,customerobj,setTransfers,datechange}) {
//const navigate=useNavigate();
    return (
        <div className="login">
            <h1>Sender Details</h1>
            <label for="username"  >Account Number</label>
            <input type="text" id="username" autocomplete="off" placeholder="Enter account number" onChange={customerobj}/><br />
            <div>
            {/* <input type="radio" id="normaltransfer" name="type" value="normal" onInput={setTransfers}/>
            <label for="normaltransfer">Normal</label>
            <input type="radio" id="banktransfer" name="type" value="bank" onInput={setTransfers}/>
            <label for="banktransfer">Bank</label> */}
            <label for="cal">Booking Date:</label>
            <input type="date" id="cal" onChange={datechange}/> <br / > <br/>
            <label for="transfertype">Transfer Type:</label>
            <select name="transtype" id="transfertype" onInput={setTransfers}>
             <option value="bank" >Bank transfer</option>
             <option value="customer">customer</option>
            </select>
            </div>
            <button onClick={authenticatenumber} >Begin</button>
        
        </div>
    );
}
export default SenderAccount;