import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
// import Logging from '../library/logging';
import { IProduct } from '../models/product';
import { IUser } from '../models/user';

//declare our middleware function
export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            // Logging.error(error);
            console.error(error);
            return res.status(422).json({ error });
        }
    };
};

//this object holds all our schemas definition
export const Schemas = {
    product: {
        //validate the schemas in two spots for our posts and our patch
        create: Joi.object<IProduct>({
            name: Joi.string().min(3).required(),
            description: Joi.string().min(3).required(),
        }),
        update: Joi.object<IProduct>({
            name: Joi.string().min(3).required(),
            description: Joi.string().min(3).required(),
        })
    },
    user: {
        create: Joi.object<IUser>({
            name: Joi.string()
                .required(),
            email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string()
                .required(),
            email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).required(),
            password: Joi.string().required()
        })
    }
};
