import User from '../models/user';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


const protectedRoute = (req:Request,res:Response,next:NextFunction) => {

    const token = req.body.token;
    jwt.verify(token,"my_secret_key",(err: jwt.VerifyErrors | null,data: any) => {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
                text: "this route is protected",
                data: data
            });
        }
    });
}


const loginUser = (req:Request,res:Response,next:NextFunction) => {
    //auth user:
    const {email,password} = req.body;

    const user = User.findOne({email,password})
    .then((user) => {
        if(user){
            const token = jwt.sign({ user },'my_secret_key');
            return res.json({
                token: token
            });
        }
        else{
            return res.json({message: "not found"});
        }
    });

    // const user = {id: 3};
    // const token = jwt.sign({ user },'my_secret_key');
    // return res.json({token: token});


}


const signUpUser = (req: Request, res: Response, next: NextFunction) => {
    const { name,email,password } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password
    });

    return user
        .save()
        .then((user) => {
            const token = jwt.sign({ user },'my_secret_key');
            res.status(201).json({ user,token: token });
        })
        .catch((error) => res.status(500).json({ error }));
};


export default {protectedRoute,loginUser,signUpUser};