import jwt, {JsonWebTokenError} from "jsonwebtoken";
import {errorLog, infoLog} from "../../utils/logger";
import {NextFunction, Request, Response} from "express";

export interface IRequestWithToken extends Request {
    token?: string;
}

export const protectedRoute = (req: IRequestWithToken, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const [, token] = header.split(' ');
        req.token = token;
    } else {
        res.sendStatus(403)
    }

    jwt.verify(req.token, process.env.TOKEN_KEY, (err: JsonWebTokenError) => {
        if(err){
            errorLog('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            infoLog('SUCCESS: Connected to protected route');
            next()
        }
    })
}