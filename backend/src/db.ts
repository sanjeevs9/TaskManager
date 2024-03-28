import mongoose,{Schema} from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()

mongoose.connect(`${process.env.DATABASE}`)


const userSchema=new Schema({
    username:{
        type:String,
        requried:true,
        unique:true,
        lowercase:true,
        minlength:1
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"todo"
    }]
    
})

const todoSchema =new Schema({
    title:{
        type:String,
        minlength:1,
        requried:true
    },
    description:{
        type:String,
        requried:true,
        minlength:5
    },
    tag:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("user",userSchema)
const Todo=mongoose.model("todo",todoSchema)


export{User,Todo}