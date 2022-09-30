import './stylesheets/App.css';
import Receiver from './receiver';
import React,{useState} from 'react';
import Svg from './coverpicture';
import "./stylesheets/currencyanimate.css";
import SenderAccount from './senderaccount';
import SenderDisplayed from './senderdisplayed';
import Error from './errormessage';
import Dashboard from './dashboard';
import axios from 'axios';
import Transaction from './transaction';

function App() {

  // document.addEventListener("contextmenu", (e)=>e.preventDefault());
  // document.addEventListener("keydown", (e)=>{if(e.key=="F12") return e.preventDefault()});
  const [message,setMessage]=useState();
  const [steps,setSteps]=useState(1);

  // senderaccount details function started
  let customerid;
  const customerobj=(e)=>{
  customerid=e.target.value;
  }

  let transfer="bank";
  const setTransfers=(e)=>{
  transfer=e.target.value;
  }

  const datechange=(e)=>{
    let date=new Date(e.target.value);
    let currdate=new Date();
    if(date.getFullYear()<currdate.getFullYear())
    {
      dateinvalid("year");
    }
    else if(date.getFullYear()==currdate.getFullYear())
    {
    if(date.getMonth()<currdate.getMonth())
    {
      dateinvalid("month");
    }
    else if(date.getMonth()==currdate.getMonth())
    {
     if(date.getDate()<currdate.getDate())
     {
      dateinvalid("date");
     }
     else if(date.getDay()==0||date.getDay()==6){
       dateonweekend();
     }
    }
    else if(date.getDay()==0||date.getDay()==6){
      dateonweekend();
    }
    }   
    else if(date.getDay()==0||date.getDay()==6){
      dateonweekend();
    }

  }
  function dateonweekend(){
    setMessage("Transaction can't be proccessed in weekends");
      setSteps(5);
  }
  function dateinvalid(param){
     setMessage(`Selected ${param} is in past. Try with valid date`);
     setSteps(5);
  }

const [senderdetails,setSenderDetails]=useState();
let banknumbers={27216037942722:0, 42895235807723:1, 45002608912874:2,69652133523248:3};

  const authenticatenumber=()=>{
    if((transfer==="customer" && !(customerid in banknumbers))||(transfer==="bank" && (customerid in banknumbers)))
    {
    axios.get(`http://localhost:8082/accountholder/${customerid}`)
    .then((response)=>{
      setSenderDetails(response.data);
      // localStorage.setItem("senderdetails",JSON.stringify(response.data));
      setSteps(steps+1);
    }).catch(() =>{
      setMessage("Account not found. Try again");
      setSteps(5);
      });
    }
    else
    {
    setMessage(`Account number you entered is not for ${transfer} transfer type`);
    setSteps(5);
    }
  }
  //senderaccount details function ended


//receiver details function started
  let bic;
  const bicobj=(e)=>{
  bic=e.target.value;
  }

  let [receiver,setReceiver]=useState([]);
  const authenticatebic=()=>{
    axios.get(`http://localhost:8082/beneficiary/${bic}`)
    .then((response)=>{
      setReceiver(response.data);
      // localStorage.setItem("receiver", JSON.stringify(response.data));
    }).catch(()=>{
       setReceiver([]);
    });
  }

  let receivername;
  const nameobj=(e)=>{
  receivername=e.target.value;
  localStorage.setItem("receivername",receivername);
  }

  const authenticatename=()=>{
    if(receiver.ifsc!=null)
    axios.get(`http://localhost:8082/beneficiary/validate/${localStorage.getItem("receivername")}`)
    .then((response)=>{
      setSteps(steps+1);
    }).catch(() => {
            setMessage("Beneficiary is sanctioned from transactions. Cannot proceed further");
            setSteps(5);
    } );
    else{
     setMessage("Transaction to the given BIC cannot be performed. Try again later");
     setSteps(5);
    }
  }
//receiver details function ended here
let amounttopay;
const [tax,setTax]=useState(0);
const checktax=(e)=>{
  localStorage.setItem("amounttopay",e.target.value);
 setTax(e.target.value * 0.0025);
}

const [msgevent,setmsgevent]=useState();
const msgevents=(e)=>{
  setmsgevent(e.target.value);
}
const [accnumber,setaccnumber]=useState();
const accnumbers=(e)=>{
  setaccnumber(e.target.value);
}
//transaction details function started here
  // let det=JSON.stringify(senderdetails);
//   // let bicdet=JSON.stringify(receiver);
//   let details=JSON.parse(det);
// let bicdetails=JSON.parse(bicdet);
  // const authenticateamount=()=> {
    
  //   if (localStorage.getItem("amounttopay") <= senderdetails.accountbalance) {
  //     executetransaction();
  //   }
  //   else if (senderdetails.overdraft.toLowerCase() == "yes") {
  //     executetransaction();
  //   }
  //   else {
  //     setMessage("Sufficient Balance not Available. Transaction declined");
  //     setSteps(5);
  //   }
  // }
  const authenticateamount=()=>{
    let total=parseInt(localStorage.getItem("amounttopay"))+tax;
    axios.put(`http://localhost:8082/accountholder/update/${total}`,senderdetails)
    .then(()=>{
      console.log("came here");
    axios.put(`http://localhost:8082/beneficiary/updatevalues/${receiver.ifsc}/${localStorage.getItem("receivername")}/${total}/${msgevent}/${accnumber}`,receiver)
    .then(()=>{
    setMessage("Transaction completed successfully. A reference file is generated in local system.");
    setSteps(5);
    }).catch((error)=>console.log(error))}).catch((error)=>{
      setMessage("Sufficient Balance not Available. Transaction declined");
      setSteps(5);
    })
  }

// const executetransaction=()=>{
//    senderdetails.accountbalance-=(parseInt(localStorage.getItem("amounttopay"))+tax);
//   axios.put(`http://localhost:8082/accountholder/update/${senderdetails.customerid}`,senderdetails)
//   .then(()=>{
//     receiver.transprocessed+=1;
//     axios.put(`http://localhost:8082/beneficiary/update/${receiver.ifsc}/${localStorage.getItem("receivername")}/${localStorage.getItem("amounttopay")}/${msgevent}/${accnumber}`,receiver);
//     setMessage("Transaction completed successfully. A reference file is generated in local system.");
//     setSteps(5);
//   }).catch((error)=>console.log(error));
// }

  function changeinstate() {
    setSteps(steps + 1);
  }

  function resetstate(){
    setSteps(1);
  }


const rent=(steps)=>{
  
  switch(steps) {
    case 1:
      return <SenderAccount authenticatenumber={authenticatenumber} datechange={datechange} setTransfers={setTransfers} customerobj={customerobj}/>
      break;
    case 2: 
      return <SenderDisplayed  senderdetails={senderdetails} changeinstate={changeinstate}/>
      break;
    case 3:
      return <Receiver bicobj={bicobj} accnumbers={accnumbers} authenticatename={authenticatename} authenticatebic={authenticatebic} receiver={receiver} nameobj={nameobj}/>
      break;
      case 4:
        return <Transaction tax={tax} checktax={checktax} msgevents={msgevents} authenticateamount={authenticateamount}/>
      case 5:
        return <Error message={message} resetstate={resetstate}/>
        break;
    default:
      //do nothing;
  }
}

const [peeps,setPeeps]=useState(true);

const changepeeps=()=>{
  setPeeps((prev)=>!prev)
}



const mint=(peeps)=>{
  if(peeps){
    return(
    <div className="app">
    <Svg/>     
     {
       rent(steps)
     }   
    </div>
    )}
  else{
    return(
    <Dashboard/>
    )
  }
}

  return (
  <>
    <div className="navbar">
      <h1>BranchPe</h1>
      {/* <Dashboard /> */}
      <button className='dashboardbutton' onClick={changepeeps}>{peeps==true? "Dashboard": "Home"}</button>
      </div>
    {
      mint(peeps)
    }
    </>
  );
}

export default App;
