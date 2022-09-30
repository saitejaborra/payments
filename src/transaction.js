import React from "react";

const  Transaction=({checktax,tax,authenticateamount, msgevents})=>{
    return (
        <div className="login">
            <h1>Transfer Details</h1>

            <label for="messagetype">Message:</label>

            <select name="msgtype" id="messagetype" onChange={msgevents}>
            <option selected value="none">select</option>
             <option value="beneficiary customer must be paid by cheque only.">CHQB</option>
             <option value="Payment is made in settlement for a trade.">CORT</option>
             <option value="Beneficiary customer or claimant will call upon identification.">HOLD</option>
             <option value="Payment between two companies that belongs to the same group.">INTC</option>
             <option value="Please advise the intermediary institution by phone.">PHOB</option>
             <option value="Please advise the intermediary by phone.">PHOI</option>
             <option value="Please advise the account with institution by phone.">PHON</option>
             <option value="Payments has a related e-Payments reference.">REPA</option>
             <option value="Payment must be executed with same day value to the">SDVA</option>
            </select>
            <label for="amount" id="amount" value={(e)=>e.target.value} >Amount</label>
            <input type="number" placeholder="Enter amount" min="100" onChange={checktax}/><br />
            <h5 id="taxbox">Transfer fee: {tax}</h5>
            <button onClick={authenticateamount} >Begin</button>
        
        </div>
    );
}
export default Transaction;