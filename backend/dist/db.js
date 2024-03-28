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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
mongoose_1.default.connect(`${process.env.DATABASE}`);
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        requried: true,
        unique: true,
        lowercase: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    todos: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "todo"
        }]
});
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        minlength: 1,
        requried: true
    },
    description: {
        type: String,
        requried: true,
        minlength: 5
    },
    tag: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});
const User = mongoose_1.default.model("user", userSchema);
exports.User = User;
const Todo = mongoose_1.default.model("todo", todoSchema);
exports.Todo = Todo;
