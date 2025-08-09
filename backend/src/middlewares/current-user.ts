import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
interface UserPayload{
    id:string;
    email:string;

}
declare global {
    namespace Express{
        interface Request{
            currentUser?:UserPayload;
        }
    }
}
export const currentUser = (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.headers.authorization)
    if(!req.headers?.authorization){
      return  next()
    }
    try {
        const payload = jwt.verify(req.headers?.authorization,process.env.JWT_KEY!) as UserPayload;
        console.log(payload)
        req.currentUser = payload;
    } catch (error) {
        
    }
    next()
}