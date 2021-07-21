import express, {Request, Response} from 'express';
import {warningLog} from "../../utils/logger";
import {ProductModel} from "../../models/ProductModel";
const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.get('/', function(req: Request, res: Response) {
    ProductModel.find((err, data) => {
        res.send({
            errors: err,
            data: data
        })
    })
});


export {
    router as productsRouter
};