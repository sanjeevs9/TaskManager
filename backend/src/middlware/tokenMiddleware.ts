import jwt from "jsonwebtoken"
import { NextFunction, Request,Response, Router } from "express"
import dotenv from "dotenv"
import { user } from "./validation";
dotenv.config();
const key =process.env.SECRET_KEY;


export async function tokenMiddleware(req:Request,res:Response,next:NextFunction){
    let token =req.headers.authorization;
    

    if(!token || !token.startsWith("Bearer ")){
        res.status(401).json({
            messgae:"Please Login"
        })
        return
    }
    token=token.split(" ")[1];
    
    if(!key){
        throw new Error("Provide Key")
    }
    const {userId}=jwt.verify(token,key) as string as unknown as {userId:string};
   
    //string{jwt.verify(token,key)} 
    if(!userId){
        res.status(401).json({
            message:"Please Login"
        })
        return
    }
        // req.userId=userid;
     res.locals.userId=userId;
     next();
}
