const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

require("../db/conn");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send(`hello world from the server`);
});

///-------------- SingUp ----------------------------------------------------

router.post("/signup", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill the field proplerly" });
  }
  try {
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matched" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      //----------- generating token ---------------------------
      const userExist = await User.findOne({ email: email });
      const token = await userExist.generateAuthToken();
      res.cookie("jwtoken",token,{
          expires:new Date(Date.now()+25892000000),
          httpOnly:true
      })
      res.status(201).json({ message: "sign successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

//----------------- Login ---------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Plz fill data properly" });
    }

    const userExist = await User.findOne({ email: email });

    if(userExist){
        const checkMatch = await bcrypt.compare(password,userExist.password);
        const token = await userExist.generateAuthToken();
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        })

        if(!checkMatch){
            res.status(400).json({error:"Invalid credentials"});
        }
        else{
            res.json({message:"user SignIn Susscessfully"});
        }
    }
    else{
        res.status(400).json({error:"Invalid credentials"});
    }


  } catch (err) {
    console.log(err);
  }
});

//----------- About Us rout------------------

router.get("/about",authenticate, (req, res) => {
  res.send(req.rootUser);
});


//----------- Logout --------------
router.get('/logout',(req,res)=>{
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send("User Logout");
})

module.exports = router;
