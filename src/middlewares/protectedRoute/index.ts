import jwt, {JsonWebTokenError} from "jsonwebtoken";
import {errorLog, infoLog} from "../../utils/logger";
import {NextFunction, Response} from "express";
import {IRequestWithToken} from "../../types";


export const protectedRoute = (req: IRequestWithToken, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const [, token] = header.split(' ');
        req.token = token;
    } else {
        res.sendStatus(403)
    }
    console.log('token inside ProtectedRoute', req.token)
    jwt.verify(req.token, process.env.TOKEN_KEY, (err: JsonWebTokenError, payload) => {
        if(err){
            errorLog('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            console.log('payload', payload)
            console.log('req.file', req.file)
            infoLog('SUCCESS: Connected to protected route');
            req.user_id = payload.user_id;
            next()
        }
    })
}
