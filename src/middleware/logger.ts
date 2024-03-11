import { Request, Response, NextFunction } from "express";
import log from "../helpers/logger";

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    log(`${req.method} ${req.url}`);
    next();
}

export default loggerMiddleware;