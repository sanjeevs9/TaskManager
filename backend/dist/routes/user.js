"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const validation_1 = require("../middlware/validation");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const zod_1 = require("zod");
dotenv.config();
const key = process.env.SECRET_KEY;
const router = express.Router();
//create user
router.post("/signUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        const valid = yield validation_1.user.parseAsync(body);
        if (!valid) {
            res.status(400).json({
                message: "error"
            });
        }
        let newUser = yield db_1.User.findOne({ username: body.username });
        if (newUser) {
            res.status(403).json({
                message: "User already exists"
            });
            return;
        }
        newUser = yield db_1.User.create({
            username: body.username,
            password: body.password
        });
        if (!key) {
            throw new Error("Secret Key is not set");
        }
        const userId = newUser._id;
        const token = jsonwebtoken_1.default.sign({ userId }, key);
        res.json({
            message: "User Created Successfully",
            newUser, token
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            return res.json({
                message: error.errors[0].message
            });
        }
        res.json({
            message: "Backend Issue"
        });
    }
}));
//signin
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        yield validation_1.user.parseAsync(body);
        const existuser = yield db_1.User.findOne({
            username: body.username,
            password: body.password
        });
        if (!existuser) {
            return res.status(401).json({
                message: "Wrong Credentials"
            });
        }
        if (!key) {
            throw new Error("Secret key is not set");
        }
        const id = existuser._id;
        const token = jsonwebtoken_1.default.sign({ id }, key);
        res.json({
            message: "user logged In Succefully",
            token, existuser
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(401).json({
                message: error.errors[0].message
            });
        }
        else {
            res.json({
                message: "Backend Issue"
            });
        }
    }
}));
//prac
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "hello from user"
    });
}));
module.exports = router;
//# sourceMappingURL=user.js.map