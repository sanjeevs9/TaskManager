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
    console.log(body)
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
            description:body.description,
            tag:body.tag
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
    console.log(todoId)
    console.log(body)
    try{
        await todo.parseAsync(body);
        
    const user=await User.findOne({_id:id})
    
    if(!user){
        return res.status(404).json({
            message:"User not exists"
        })
    }
   
    const newTodo=await Todo.updateOne({_id:todoId},
        {
            $set:{
                title:body.title,
                description:body.description,
                tag:body.tag,
                completed:body.completed
            }
        })
        console.log(newTodo)
        return res.json({
            message:"Updated Successfully",
            newTodo
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
    const todoId=req.params.todoid
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
        let deletedTodo=await Todo.findOne({_id:todoId});
        if(!deletedTodo){
            return res.json({
                message:"Todo not  found"
            })
        }

        deletedTodo=await Todo.deleteOne({_id:todoId})
        await User.updateOne({_id:id},
            {
                $pull:{
                    todos:todoId
                }
            })

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
    const id = res.locals.userId;
    console.log(id)

    const user = await User.findById(id).populate("todos");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({ todos: user.todos });
})










router.get("/",async(req:Request,res:Response)=>{
    res.json({
        messgage:"hello from todo"
    })
})

module.exports=router