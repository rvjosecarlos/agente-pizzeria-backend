import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

declare global {
    namespace Express {
        interface Request {
            validateRequestData: unknown
        }
    }
};

export const validateWithZod = (zodSchema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            const requestData = {
                ...req.body,
                ...req.params
            };
            const { data, success, error } = zodSchema.safeParse(requestData);
            if(!success){
                return res.status(400).json({
                    success: false,
                    message: "",
                    error: [{ msg: error.message }],
                    data: null
                })
            };
            req.validateRequestData = data;
            next();
        }
        catch(error: unknown){
            res.status(500).json({
                success: false,
                message: "",
                errors: [{ message: error }],
                data: null
            })
        }
    };
};