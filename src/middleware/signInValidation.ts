import { NextFunction, Request, Response } from "express";
import userSchema from "../zodSchema/signInSchema.js";
import {z} from "zod"




function singInValidation(req : Request, res : Response, next : NextFunction) {

    try {

        const validatedData = userSchema.parse(req.body);
        req.body = validatedData;
        console.log("validated data :: ", validatedData);
        
        next();
    
    } catch (error) {
        if(error instanceof z.ZodError) {
            console.log("SignInValidation Error :: ", error);
            
            const errors = error.errors.map((err) => ({
                field: err.path.join('.'),
                isErr : true,
                msg: err.message,
              }));
        

            return res.status(400).json({
                status : "failed",
                statusCode : 400,
                errMsgs : {formErr : [...errors]},
            });
        }

        return res.status(500).json({
            status : "failed",
            statusCode : 500,
            errMsgs: { otherErr : 'Internal Server Error'},
        });
    }
}


export default singInValidation;