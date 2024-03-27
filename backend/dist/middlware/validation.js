"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = exports.user = void 0;
const zod_1 = __importDefault(require("zod"));
exports.user = zod_1.default.object({
    username: zod_1.default.string({ required_error: "Username is Required" })
        .min(1, { message: "username is Required" }),
    password: zod_1.default.string({ required_error: "Password is required" })
        .min(5, { message: "minimum size of 5 is requried" })
});
exports.todo = zod_1.default.object({
    title: zod_1.default.string({ required_error: "Title is Required" })
        .min(1, { message: "Title is Required" }),
    description: zod_1.default.string({ required_error: "Description is Requried" })
        .min(1, { message: "Description is Required" }),
    tag: zod_1.default.string({ required_error: "tag error" })
});
