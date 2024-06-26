const express= require("express")
import {Request,Response} from "express"
import { user } from "../middlware/validation";
import {User} from "../db"
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import { ZodError, string } from "zod";

dotenv.config()
const key=process.env.SECRET_KEY;
const router =express.Router();

//create user
router.post("/signUp",async(req:Request,res:Response)=>{
const body=req.body;
try{
    const valid=await user.parseAsync(body);
    if(!valid){
        res.status(400).json({
            message:"error"
        })
    }
    
 let newUser=await User.findOne({username:body.username})
 if(newUser){
    res.status(403).json({
        message:"User already exists"
    })
    return 
 }
 newUser=await User.create({
    username:body.username,
    password:body.password
 })
if(!key){
    throw new Error("Secret Key is not set");
}
const userId=newUser._id;
const token =jwt.sign({userId},key);

 res.json({
    message:"User Created Successfully",
    newUser,token
 })
 

}catch(error:unknown){
   
   if(error instanceof ZodError){
      return  res.json({
            message:error.errors[0].message
        })
    }
    res.json({
        message:"Backend Issue"
    })
    
}

})

//signin
router.post("/signin",async(req:Request,res:Response)=>{
    const body = req.body;
    try{
       await user.parseAsync(body);
        
       const existuser=await User.findOne({
        username:body.username,
        password:body.password
       })

       if(!existuser){
       return res.status(401).json({
            message:"Wrong Credentials"
        })
       }
        if(!key){
            throw new Error("Secret key is not set")
        }
        const id=existuser._id;
       const token=jwt.sign({id},key);
       res.json({
        message:"user logged In Succefully",
        token,existuser
       })       
    }catch(error){
        if(error instanceof ZodError){
          return res.status(401).json({
                message:error.errors[0].message
                
            })
        }else {
            res.json({
                message:"Backend Issue"
            })
        }
        
    }
})


//prac
router.get("/",async(req:Request,res:Response)=>{
    res.json({
        message:"hello from user"
    })
})

module.exports=router;