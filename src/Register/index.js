import { Container,Form,Button } from "react-bootstrap";
import * as React from 'react'

export default function Register(){
    const [Email,setEmail]= React.useState('');
    const [Number,setNo]= React.useState('');
    const [Pass,setPass]= React.useState('');
    const handleEmail=(e)=>{setEmail(e.target.value)}
    const handleNo=(e)=>{setNo(e.target.value)}
    const handlePass=(e)=>{setPass(e.target.value)}
    const [send,setSend]=React.useState(false);
    const CheckPassword=(inputtxt)=>{ 
    var passw=   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if(inputtxt.match(passw)) 
    { 
    return true;
    }
    else
    { 
    alert('Wrong... Password!')
    return false;
    }
    }



    async function registerUser(e){
    e.preventDefault();

    if(CheckPassword(Pass)){
    const resp= await fetch('http://localhost:8080/api/register',{
            method:'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                Email,
                Number,
                Pass,
            }),
        })
        const data =await resp.json()
        setSend(!send)
        console.log(data)
    if(await resp){
            if(data.status==="ok"){
                window.location.href='/';
            }
            else console.log("error")
        }
    
    }
    }

    const login=()=>{
        window.location.href='/';
    }

    return( 
    <div className="form-container">
    <Container className="justify-content-md-center  mt-5 p-4 frm" >
        <div className="">
            <h2 className="tile">Sign Up</h2>
            <Form onSubmit={registerUser}>
          <Form.Group className="mb-3 mt-3" controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" size="lg" placeholder="Enter email" value={Email} onChange={handleEmail} />
          </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="Phone Number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="email " size="lg" placeholder="Enter email" value={Number} onChange={handleNo} />
          </Form.Group>


          <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="frm-inp"  size="lg" type="password" placeholder="Password" minLength={8} value={Pass} onChange={handlePass} />
              <span className="warn " >Min 8 characters limit.</span>
          </Form.Group>

          <center>
              <Button className="btn-f mt-2 center" size="lg" variant="primary" type="submit">
                Sign Up
              </Button>
          </center>
          <center><span className="mb-4 text-success" onClick={login}>Login</span></center>
          </Form>
          </div>


    </Container>
 </div>
);

}

