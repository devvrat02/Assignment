const express = require('express');
const router = express.Router();

let cand = require('../data');

// for getting the data of all Candidates
router.get("/", (req,res) => {
    try {
        res.json(cand);    
    } catch (error) {
        res.json({status:"error" ,msg: error})
        
    }    
    

});

// for getting the data of Candidate by id


router.get('/:id',(req,res)=>{
    try {
        const found =cand.some(cand=>cand.id==parseInt(req.params.id))
        if (found){
            res.json(cand.filter(cand=>cand.id==parseInt(req.params.id)))
        }
        else 
        {
            res.sendStatus(404)
        }     
   
    } catch (error) {
        res.sendStatus(404)
        res.json({'msg':error})
        
    }
})

// for creating a new Candidate 

router.post('/',(req,res)=>{
   try {
    const newCand ={
        id: cand.length+1,
        Name : req.body.Name,
        Email: req.body.Email,
        DoB: req.body.DoB,
        Age: req.body.Age,
        Address: req.body.Address,
        State: req.body.State,
        Pin: req.body.Pin,
        Result: "Shortlist",
    }
    if(!newCand.Name || !newCand.Email){
        return res.sendStatus(400)
    }
    cand.push(newCand)
    res.json({status: "ok",cand})
   } catch (error) {
    return res.json({status: "error",error : error})

   } 
    
})





// for updating the state of Candidate by id

router.put('/state/:id',(req,res)=>{
    const found =cand.some(cand=>cand.id==parseInt(req.params.id))
    if (found){
        const updateCand={
            id: req.params.id,
            Result: req.body.status,
        };
        console.log(updateCand.Result)
        cand=cand.map(cand=>{
            if(cand.id==updateCand.id){
            return  {...cand, Result :updateCand.Result}
            }
            return cand;
        }
        )
      
        res.json({status:"ok" ,msg: 'User updated'})
       
       
    }
    else 
    {
        res.sendStatus(404)
    }
})





// for updating the data of user by id
router.put('/:id',(req,res)=>{
try {
    
    
    const found =cand.some(cand=>cand.id==parseInt(req.params.id))
    if (found){
        const updateCand={
            id: req.params.id,
            Name : req.body.Name,
            Email: req.body.Email,
            DoB: req.body.DoB,
            Age: req.body.Age,
            Address: req.body.Address,
            State: req.body.State,
            Pin: req.body.Pin,
            Result: req.body.Result,
        };
        cand=cand.map(cand=>{
            if(cand.id==updateCand.id){
                return  updateCand;
            }
            else{
                return cand;}
            }
            )
            
            res.json({status:"ok" ,msg: 'User updated'})
            
            
        }
        else 
        {
            res.sendStatus(404)
        }
    } catch (error) {
        res.json({status:"error" ,msg: error})
        

    }

})






// for deleting the data of user by id
router.delete ('/:id',(req,res)=>{
    try {
        const found =cand.map(cand=>cand.id==parseInt(req.params.id))
        console.log(found)
        if (found){
            cand =cand.filter(cand=>{return(cand.id !=parseInt(req.params.id))})
            res.json({msg:"User deleted"})
            console.log(cand)
        }
        else 
        {
            res.sendStatus(404)
        }
    } catch (error) {
        res.json({status:"error" ,msg: error})
    }
})
    
    
module.exports =router