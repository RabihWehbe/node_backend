import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const verifyToken = (req : Request,res:Response,next:NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split(" ")[1];
        jwt.verify(bearerToken,"my_secret_key",(err: jwt.VerifyErrors | null,data: any)=>{
            if(err){
                res.sendStatus(403);
            }
        });
        next();
    }
    else{
        res.sendStatus(403);
    }
}