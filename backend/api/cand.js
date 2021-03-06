const express = require('express');
const router = express.Router();

let cand = require('../data');
const Cand = require('../models/cand.model');


// for getting the data of all Candidates
router.get("/", async(req,res) => {
    try {
        let data =await Cand.find();
        console.log(data)
        res.json(data);    
    } catch (error) {
        res.json({status:"error" ,msg: error})   
    }    
    
 
});

// for getting the data of Candidate by id


router.get('/:id',async(req,res)=>{
    try { 
        let data=await Cand.findOne({id:req.params.id})
        console.log("req",data);
      if (data){
           res.json(data);
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

router.post('/',async(req,res)=>{
   try {
    let data =await Cand.find();
    const length= data.length;
    console.log(length)
    const newCand ={
        id: length+1,
        Name : req.body.Name,
        Email: req.body.Email,
        DoB: req.body.DoB,
        Age: req.body.Age,
        Address: req.body.Address,
        State: req.body.State,
        Pin: req.body.Pin,
        Result: "Shortlist",
    }
    await Cand.create(newCand);
    if(!newCand.Name || !newCand.Email){
        return res.sendStatus(400)
    }
    res.json({status: "ok",data})
   } catch (error) {
    return res.json({status: "error",error : error})
   } 
    
})



// for updating the state of Candidate by id

router.put('/state/:id',async(req,res)=>{
    let data=await Cand.findOne({id:req.params.id})
    if (data){
        const updateCand={
            Result: req.body.status,
        };
        console.log(updateCand.Result)
        Cand.updateOne({id:req.params.id},updateCand,(err,res)=>{if (err) throw err ; })
        res.json({status:"ok" ,msg: 'User updated'})
       
    }   
    else 
    {
        res.sendStatus(404)
    }
})





// for updating the data of user by id
router.put('/:id',async(req,res)=>{
try {
    let data=await Cand.findOne({id:req.params.id})
    if (data){
        const updateCand={
            id: req.params.id,
            Name : req.body.Name,
            DoB: req.body.DoB,
            Age: req.body.Age,
            Address: req.body.Address,
            State: req.body.State,
            Pin: req.body.Pin,
            Result: req.body.Result,
        };
        let newvalues = { $set: updateCand };
        Cand.updateOne({id:req.params.id},newvalues,(err,res)=>{if (err) throw err ; })

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
router.delete ('/:id',async(req,res)=>{
    try {
        let data=await Cand.findOne({id:req.params.id})

        console.log(data)
        if (data){
            Cand.deleteOne({id:req.params.id},(err)=>{if (err) throw err;})
            res.json({msg:"User deleted"})
            console.log(data)
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