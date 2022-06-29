import { Container,Form,Button } from "react-bootstrap";
import * as React from "react";
import {useNavigate} from "react-router-dom";
function CandidateForm(props) {

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



      function getAge(dateString) {
        var dt=new Date(dateString);
        var birthYear= dt.getFullYear();
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var     age = currentYear - birthYear;
        return age;
     }

    let person =props.info;
    const navigate = useNavigate();
    const [Candidate, setCandidate] = React.useState({
        Name : person.Name,
        id : person.id,
        DoB: person.DoB,
        Age: person.Age,
        Email: person.Email,
        Address: person.Address,
        State: person.State,
        Pin: person.Pin,
        Result: person.Result
    }
    );   
    const [dat,setdate]=React.useState(true);
    const handleChange = (props) => (event) => {
        if (event.target.value !== null) {
            setCandidate({
                ...Candidate, [props]: event.target.value
            })
        }
        if (props==="Dob"){setdate(!dat)}
    }


    const handleUpdate =(e)=>{
        async function UpdateUser (){
            const { Name,id,DoB,Age,Email,Address,State,Pin,Result} =Candidate;
            const resp= await fetch('http://localhost:8080/cand/'+id,{
                    method:'PUT',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        Name,
                        id,
                        DoB,
                        Age,
                        Email,
                        Address,
                        State,
                        Pin,
                        Result,
                    }),
                })
                const data =await resp.json()
                console.log(data)
                if(data.status==="ok"){
                        alert('User Data Inserted');
                        navigate('/CandidateL');

                    }
                    else console.log("error")
                
                
            }
            UpdateUser()
        
    }


    const handleForm =(e)=>{
            async function registerUser(){
                const { Name,DoB,Age,Address,State,Pin}=Candidate;
                const resp= await fetch('http://localhost:8080/cand/',{
                        method:'PUT',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                            Name,
                            DoB,
                            Age,
                            Email : Name+"@mail.com",
                            Address,
                            State,
                            Pin,
                        }),
                    })
                    const data =await resp.json()
                    console.log(data)
                if(await resp){
                        if(data.status==="ok"){
                            alert('User Data Updated');
                            navigate('/CandidateL');
    
                        }
                        else console.log("error")
                    }
                    
                }
                registerUser()
            
        
    }
   
    const handleCancel =()=>{
        navigate('/CandidateL');
    }
    
    React.useEffect(()=>{ 
        setCandidate({
            ...Candidate, ['Age']: getAge(Candidate.DoB)
        })
    },
    [dat]);
    return (
        <div className="form-container">
        <Container className=" mt-5 p-4 frm-cand" >
            <div className="">
                <h2>Create Candidate</h2>
                <Form onSubmit={handleForm}>
            <div className="row" >
              
                <div className="col btn-grp">
              <Form.Group className="mb-3 mt-3" controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" size="lg" placeholder="Enter name" required value={Candidate.Name} onChange={handleChange('Name')}/>
              </Form.Group>

              <Form.Group className="mb-3 mt-3" >
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="Date"  size="lg"  placeholder="Enter DoB" required value={Candidate.DoB} onChange={handleChange('DoB')}/>
              </Form.Group>

              <Form.Group className="mb-3 mt-3" controlId="Age">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" size="lg" placeholder="Enter Age" required value={Candidate.Age} onChange={handleChange('Age')}/>
              </Form.Group>
              </div>
              <div className="col btn-grp">
              <Form.Group className="mb-3 mt-3" controlId="Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" size="lg" placeholder="Enter Address" required value={Candidate.Address} onChange={handleChange('Address')}/>
              </Form.Group>

              <Form.Group className="mb-3 mt-3" controlId="State">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text " size="lg" placeholder="Enter State" required value={Candidate.State} onChange={handleChange('State')}/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="Pin">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control   size="lg" type="text" placeholder="Pin Code" required value={Candidate.Pin} onChange={handleChange('Pin')}/>
              </Form.Group>
            <div className="cand-btn mb-4 mt-4">  
                <Button className="btn-cancel " size="lg"  variant="outline-info" type="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>
         {(Candidate.id==="")?<Button className="btn-create" size="lg" type="submit" >
                        Create
                  </Button>:<Button className="btn-create" size="lg" type="update" onClick={handleUpdate}>
                         Update
                  </Button>}
                </div>
              </div>
            </div>
            </Form>
        </div>
    
    
        </Container>
     </div>
        
    
        );
}

export default CandidateForm;