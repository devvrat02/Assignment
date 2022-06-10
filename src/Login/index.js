import { Container,Form,Button } from "react-bootstrap";
import * as React from "react";

export default function Login(){
    const [Email,setEmail]= React.useState('');
    const [Pass,setPass]= React.useState('');
    const handleEmail=(e)=>{setEmail(e.target.value)}
    const handlePass=(e)=>{setPass(e.target.value)}
 
    async function login(e){
        e.preventDefault();
        const resp= await fetch('http://localhost:8080/api/login',{
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    Email,
                    Pass,
                }),
            })
            const data =await  resp.json()
      
            console.log(data)
            if(data.user){
            localStorage.setItem('token',data.user);    
            window.location.href='/CandidateL';
            }
            else console.log("error")
          
        }

    return(
    <div className="form-container">
        <Container className="justify-content-md-center  mt-5 p-4 frm" >
            <div className="">
                <h2 className="tile">Login</h2>
                <Form onSubmit={login}>
              <Form.Group className="mb-3 mt-3" controlId="Email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" size="lg" placeholder="Enter email"  value={Email} onChange={handleEmail} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="frm-inp"  size="lg" type="password" placeholder="Password" minLength="10"  value={Pass} onChange={handlePass} />
                  <span className="warn " >Min 8 characters limit.</span>
              </Form.Group>

              <center>
                  <Button className="btn-f mb-4 mt-2 center" size="lg" variant="primary" type="submit">
                    Login
                  </Button>
              </center>
              </Form>
              </div>

        </Container>
     </div>

   );

}

