import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(`Middleware de error: ${JSON.stringify(error)}\n Data de entrada: ${JSON.stringify(req.validateRequestData)}`);
    res.status(500).json({
        succes: false,
        message: "",
        errors: [{ "msg": error }],
        data: null
    });
};