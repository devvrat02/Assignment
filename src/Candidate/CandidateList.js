import {Container,Table,DropdownButton,Dropdown} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import * as React from 'react';

let state="true";

function Dropbutton(props){
  
    let data=props.Val.Result;
    let id =props.Val.id;
    const[status,setStatus]=React.useState(data);
    const handleState =async(value)=>{
              let status=value;    
            const resp= await fetch('http://localhost:8080/cand/state/'+id,{
                    method:'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        id,
                        status,
                    }),
                })
                const data =await resp.json()
                console.log(data)
                if(data.status==="ok"){
                        alert('User Data Updated');
                    }
                    else console.log("error")
                
            
    }
   
    return(<div className="dropdown">
    
    <DropdownButton
        key={props.id}
        id={`dropdown`}
        title={status}
        variant={"none"}
        onChange={(e)=>{setStatus(e.target.value)}

      }
        
        >
        <Dropdown.Item eventKey="1" value="Shortlist" onClick={(e)=>{setStatus(e.target.text); handleState(e.target.text);
          }}>Shortlist</Dropdown.Item>
        <Dropdown.Item eventKey="2" value="Rejected" onClick={(e)=>{setStatus(e.target.text); handleState(e.target.text);}} >Rejected</Dropdown.Item>
      </DropdownButton>
  
  
  
  </div>
  
  
  
  );
}



function Row(props){
    let data=props.Data;
    const navigate = useNavigate();
    const handleCandidate=()=>{
      navigate('/Candidate',{state : data})
    }

    const DelCandidate=async(val)=>{

      const resp= await fetch('http://localhost:8080/cand/'+val,{
        method:'DELETE',
        headers : {
            'Content-Type' : 'application/json',
        },
    })
    const data =await  resp.json()

    console.log(data)
    if(data.msg){
        state=(!state);
        alert("Candidate is Deleted", data)
        navigate('/CandidateL')

    }
    else console.log("error")
    

    }
    return(
    <tr key={data.id} className='lt'>
        <td>{data.id}</td>
        <td>{data.Name}</td>
        <td>{data.DoB}</td>
        <td>{data.Email}</td>
        <td className='d-flex justify-content-start' size="lg" style={{align:"left"}}><Dropbutton Val={data}  /></td>
        <td className='add m-lg-5' >
        <i onClick={handleCandidate} className="bi bi-pen m-2"/>
        <i onClick={()=>{DelCandidate(data.id)}} className="bi bi-trash m-lg-5"/>
        </td>
        

    </tr>
    )
}

function CandidateList() {
  let token =localStorage.getItem('token');
  const auth=async()=>{
    let token =localStorage.getItem('token');
      
       const resp= await fetch('http://localhost:8080/api/auth/',{
         method:'GET',
         headers : {
           'x-access-token': token,
           'Content-Type' : 'application/json',
         },
     })
     const data =await resp.json()
     console.log("data",data)
     if(data.status!=="ok"){
       window.location.href='/';
     }
     }
     React.useEffect(()=>{auth()},[])








  const [Candidate ,setCandidate]=React.useState(['']);
  const person=async()=>{
    const resp= await fetch('http://localhost:8080/cand/',{
      method:'GET',
      headers : {
        'x-access-token': token,
        'Content-Type' : 'application/json',
      },
  })
  const data =await resp.json()
  setCandidate(data)
  }

  React.useEffect(()=>{person()},[state]);
  const navigate = useNavigate();
    return (  <>
    <Container className='can-list'>
        <h1>Candidate List : {Candidate.length}</h1>
    <Table borderless hover  className='tb'>
  <thead className='tabhead'>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Date of Birth</th>
      <th style={{width:"30%"}}>Email</th>
      <th>Result</th>
      <th></th>
   

    </tr>
    </thead>
         <tbody>
            {Candidate.map((val)=> ( <Row key={val.id} Data={val}/> ))}
        </tbody>
    </Table>
    
    <p className='add' onClick={()=>{ navigate('/Candidate');}}>+ ADD NEW ADDRESS</p>
</Container>
    
    </>);
}

export default CandidateList;