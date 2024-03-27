import { Router } from "express";
import{Request,Response} from "express"
const express=require("express");
const router=express.Router();
const User=require("./user")
const Todo=require("./todo")

router.use("/user",User)
router.use("/todo",Todo)
router.get("/",async(req:Request,res:Response)=>{
    res.json({
        message:"hello from api"
    })
})

module.exports=router