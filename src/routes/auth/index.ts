import express, {Request, Response} from 'express';
import {warningLog} from "../../utils/logger";
const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.post('/', function(req: Request, res: Response) {
    const {emailOrLogin, password} = req.body
    res.send('auth home page');
});


export {
    router as authRouter
};