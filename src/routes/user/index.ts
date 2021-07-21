import express, {Request, Response} from 'express';
import {warningLog} from "../../utils/logger";
import {protectedRoute} from "../../middlewares/protectedRoute";

const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.use(protectedRoute);

router.get('/', function(req: Request, res: Response) {
        res.send('protected data')
});

export {
    router as userRouter
};