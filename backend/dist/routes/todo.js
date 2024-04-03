"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const tokenMiddleware_1 = require("../middlware/tokenMiddleware");
const validation_1 = require("../middlware/validation");
const db_1 = require("../db");
const zod_1 = require("zod");
const router = express.Router();
//create tood
router.post("/create", tokenMiddleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        yield validation_1.todo.parseAsync(body);
        const id = res.locals.userId;
        const user = db_1.User.findOne({ _id: id });
        if (!user) {
            res.status(401).json({
                message: "user not exists"
            });
            return;
        }
        const newTodo = yield db_1.Todo.create({
            title: body.title,
            description: body.description,
            tag: body.tag
        });
        yield db_1.User.updateOne({ _id: id }, {
            $push: {
                todos: newTodo._id
            }
        });
        res.json({
            message: "Created",
            newTodo
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(401).json({
                message: error.errors[0].message
            });
        }
        else {
            res.json({
                message: "backend Issue"
            });
        }
    }
}));
//update
router.post("/update/:todoid", tokenMiddleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const todoId = req.params.todoid;
    const id = res.locals.userId;
    console.log(todoId);
    console.log(body);
    try {
        yield validation_1.todo.parseAsync(body);
        const user = yield db_1.User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                message: "User not exists"
            });
        }
        const newTodo = yield db_1.Todo.updateOne({ _id: todoId }, {
            $set: {
                title: body.title,
                description: body.description,
                tag: body.tag,
                completed: body.completed
            }
        });
        console.log(newTodo);
        return res.json({
            message: "Updated Successfully",
            newTodo
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(401).json({
                message: error.errors[0].message
            });
        }
        res.json({
            message: "Backend Issue"
        });
    }
}));
//delete
router.post("/delete/:todoid", tokenMiddleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.todoid;
    const id = res.locals.userId;
    try {
        const user = yield db_1.User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                message: "User not Exists"
            });
        }
        // const newTodo=await Todo.updateOne({_id:todoId},
        //     {
        //         $pull:{
        //         }
        //     }
        //     )
        let deletedTodo = yield db_1.Todo.findOne({ _id: todoId });
        if (!deletedTodo) {
            return res.json({
                message: "Todo not  found"
            });
        }
        deletedTodo = yield db_1.Todo.deleteOne({ _id: todoId });
        yield db_1.User.updateOne({ _id: id }, {
            $pull: {
                todos: todoId
            }
        });
        res.json({
            message: "todo deleted"
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
}));
//get todo
router.get("/get", tokenMiddleware_1.tokenMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = res.locals.userId;
    console.log(id);
    const user = yield db_1.User.findById(id).populate("todos");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json({ todos: user.todos });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        messgage: "hello from todo"
    });
}));
module.exports = router;
//# sourceMappingURL=todo.js.map