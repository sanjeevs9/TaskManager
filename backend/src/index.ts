import { Request, Response } from 'express';
const express = require('express');
const cors=require("cors")
const mainRouter=require("./routes/index")
const PORT = 3000;

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api",mainRouter)

app.get("/",async(req:Request,res:Response)=>{
    res.json({
        message:"hello"
    })
})


app.listen(PORT);
