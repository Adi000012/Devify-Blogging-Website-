const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const users = require("../models/loginSchema");
const contact = require("../models/contact");


const { jwtMiddleWere, genrateToken} = require("../token");

router.get("/",(req,res)=>
{
res.render("./../views/index");
});


router.get("/index",(req,res)=>
{
res.render("./../views/index");
});

router.get("/Auth",(req,res)=>
{
res.render("./../views/Auth");
});


router.get("/About",(req,res)=>
{
res.render("./../views/About");
});

router.get("/Blogs",jwtMiddleWere,(req,res)=>
{
res.render("./../views/Blogs");
});


router.get("/contact",(req,res)=>
{
res.render("./../views/contact");
});



router.post("/signup", async (req, res) => 
{
    try{
        const data = req.body;
        const existingUser = await users.findOne({ email: data.email });
        
        if(!existingUser)
        {
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
   
        const newUser = new users(data);
        const save = await newUser.save(); 
        
        res.render("./../views/Auth");
        }
        else
        {
          res.send("user Alerady Persent");
        } 
    }
    
    catch(err)
    {
        res.send("Somthing Get Error"+ err);
    }
});


router.post("/login", async(req, res)=>
{
    try
    {
    const { email, password } = req.body; 
    const checkUser = await users.findOne({ email });
  
    if (!checkUser) 
    {
    return res.status(401).send("Username Not Found");
    }
  
    const passwordCheck = await bcrypt.compare(password, checkUser.password);
  
    if (!passwordCheck)
    {
    return res.status(401).send("Invalid Details"); 
    }

    const payload = {
    email: checkUser.email,
    id: checkUser.id };
  
    const token = genrateToken(payload);
    console.log(token);

    
    res.render("./../views/index");
    } 

    catch (error)
    {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  

router.post("/contact", async (req, res)=>
{
    try
    {
    const data = req.body;
    const checkUser = await users.findOne({ email : req.body.email });
  
    if (!checkUser) 
    {
    return res.status(401).send("Email Not Found");
    }

    const newContact = new contact(data);
    const save = await newContact.save();
    }
    catch (err)
    {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
});

module.exports= router;