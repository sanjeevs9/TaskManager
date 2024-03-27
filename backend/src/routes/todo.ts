const express=require("express")
import{Request,Response} from "express"
import { tokenMiddleware } from "../middlware/tokenMiddleware";
import { todo } from "../middlware/validation";
import { Todo, User } from "../db";
import { ZodError } from "zod";

const router =express.Router();


//create tood
router.post("/create",tokenMiddleware,async(req:Request,res:Response)=>{
    const body=req.body;
    try{
        await todo.parseAsync(body);
        const id =res.locals.userId;

        const user=User.findOne({_id:id})
        if(!user){
            res.status(401).json({
                message:"user not exists"
            })
            return 
        }
        const newTodo=await Todo.create({
            title:body.title,
            description:todo.description,
            tage:body.tag
        })
        await User.updateOne({_id:id},{
            $push:{
                todos:newTodo._id
            }
        })
        res.json({
            message:"Created",
            newTodo
        })


    }catch(error){
        if(error instanceof ZodError){
            res.status(401).json({
                message:error.errors[0].message
            })
        }else{
            res.json({
                message:"backend Issue"
            })
        }
    }

})

//update
router.post("/update/:todoid",tokenMiddleware,async(req:Request,res:Response)=>{
    const body = req.body;
    const todoId=req.params.todoid;
    const id=res.locals.userId;
    try{
        await todo.parseAsync(body);

    const user=await User.findOne({_id:id})
    if(!user){
        return res.status(404).json({
            message:"User not exists"
        })
    }
    const newTodo=await Todo.updateMany({_id:todoId},
        {
            $set:{
                title:body.title,
                description:body.description,
                tag:body.tag,
                completed:body.completed
            }
        })
    }catch(error){
        if(error instanceof ZodError){
           return res.status(401).json({
                message:error.errors[0].message
            })
        }
        res.json({
            message:"Backend Issue"
        })
    }
})

//delete

router.post("/delete/:todoid",tokenMiddleware,async(req:Request,res:Response)=>{
    const todoId=req.params.todoId
    const id=res.locals.userId
    try{
        const user=await User.findOne({_id:id})
        if(!user){
            return res.status(404).json({
                message:"User not Exists"
            })
        }
        // const newTodo=await Todo.updateOne({_id:todoId},
        //     {
        //         $pull:{
                    
        //         }
        //     }
        //     )

        const deletedTodo=await Todo.deleteOne({_id:todoId})
        res.json({
            message:"todo deleted"
        })

    }catch(error){
        res.json({
            message:error
        })
    }
})

//get todo
router.get("/get",tokenMiddleware,async(req:Request,res:Response)=>{
    const id=res.locals.userId;
    const todo=await User.find({_id:id}).populate("todos")
    return res.json({todo})
})










router.get("/",async(req:Request,res:Response)=>{
    res.json({
        messgage:"hello from todo"
    })
})

module.exports=router