import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const singup=async (req,res)=>{
    try{
        const {fullName,userName,password,conformPassword,/*gender*/}=req.body;
       
        if(password!=conformPassword){
            return res.status(400).json({error:"password don't match"})
        }
        const user=await User.findOne({userName});
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
       
        const newUser= new User({
            fullName,
            userName,
            password,
            //gender
        });
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            userName:newUser.userName,

        })
        
        
    }
    catch(error){
        console.log("error in singup controller",error.message)
        res.status(500).json({error:error.message})
    }
}

export const login=async (req,res)=>{
    try{
       const {userName,password}=req.body;
       console.log(req.body);
       const user=await User.findOne({userName});

       const ispasswordCorrect= password === user?.password ||password === "";
       console.log("user:",user);
       console.log("pass:",ispasswordCorrect);
       if(!user||!ispasswordCorrect){
          res.status(400).json({error:"invalid username or password"});
       }
       res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        userName:user.userName

    })  
      
    }
    catch(error){
        console.log("error in login controller",error.message)
        res.status(500).json({error:error.message})
    }
}


export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxaAge:0});
        res.status(200).json({message:"loged out sussfully"});
    }catch(error){
        console.log("error in logout controller",error.message)
        res.status(500).json({error:error.message})
    }
}