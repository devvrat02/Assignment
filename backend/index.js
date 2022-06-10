const express = require('express');
const app = express();

const cors = require("cors");
const mongoose =require('mongoose');
const User = require('./models/user.model');
const jwt =require('jsonwebtoken');
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/deskala').then(()=>{
    console.log('Connected Succesfully');
})

app.use(express.urlencoded({extended:false}))

// Here the api calls that i Implemented with json For crud operation with candidate details.
app.use('/cand',require('./api/cand'));

// Registeration/Sign UP and Register a new user to database 
app.post('/api/register',async(req,res)=>{
    console.log(req.body);
    try { 
        await User.create({
            name : req.body.Email,       
            email: req.body.Email,
            password: req.body.Pass,
            No: req.body.Number,
        })
        console.log("data updated")
        res.json({status : 'ok'});
    } catch (error) {
        res.json({status : 'error'});
        
    }
   
})



// Decode jwt token NOT Perfectly connected to all apis but a static prefec is set
app.get('/api/login',async(req,res)=>{
    const token =req.header['x-access-token']
    try {
        const decoded =jwt.verify(token,'secret')
        const email = decoded.email;
        const user = await User.findOne({ email: email })
        return {status :'ok', user: user.name}
    } catch (error) {
        console.log(error);
        res.json({status :'error', error : 'invalid token'})
    }
    
})


// Log in /Sign IN and Login user to database 

app.post('/api/login',async(req,res)=>{
    console.log(req.body);
    
    const user = await User.collection.findOne({     
            email: req.body.Email,
            password: req.body.Pass,
        })

        if(user){
            const token =jwt.sign({
                email : req.user.Email 
            },'secret')
        console.log("User Exist")
        res.json({status : 'ok',user : token});
    } 
    else {
        res.json({status : 'error', user : false});
        
    }
})



var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://localhost:%s", port)
})