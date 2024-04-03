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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.SECRET_KEY;
function tokenMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = req.headers.authorization;
        console.log(token + "tokennnnnnn");
        if (!token || !token.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please Login"
            });
            return;
        }
        token = token.split(" ")[1];
        if (!key) {
            throw new Error("Provide Key");
        }
        try {
            const { userId } = jsonwebtoken_1.default.verify(token, key);
            //string{jwt.verify(token,key)} 
            if (!userId) {
                res.status(401).json({
                    message: "Please Login"
                });
                return;
            }
            // req.userId=userid;
            res.locals.userId = userId;
            next();
        }
        catch (err) {
            res.status(401).json({
                message: "Please Login"
            });
            return;
        }
    });
}
exports.tokenMiddleware = tokenMiddleware;
//# sourceMappingURL=tokenMiddleware.js.map