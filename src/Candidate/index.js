import CandidateForm from "./CandidateForm";
import * as React from "react";
import {useLocation} from "react-router-dom"
function Candidate() {
 let data={
  Name : "",
  id : "",
  DoB: "",
  Age: "",
  Email: "",
  Address: "",
  State: "",
  Pin: "",
  Result: ""
}
const {state} =useLocation();

if(state){
    return ( <>
      <CandidateForm info={state}/>
    </> );}
    else
    {
      return ( <>
        <CandidateForm info={data}/>
      </> );}
}

export default Candidate;