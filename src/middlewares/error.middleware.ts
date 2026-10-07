import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    
    res.status(500).json({
        succes: false,
        message: "",
        errors: [{ "msg": error.message }],
        data: null
    });
};