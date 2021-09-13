import express, {Request, Response} from 'express';
import {warningLog} from "../../utils/logger";
import {Product} from "../../models/Product";
const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});
/**
 * @route GET /product
 * @group Product - Operations about product
 * @returns {Product.model} 200 - product info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function(req: Request, res: Response) {
    Product.find((err, data) => {
        res.send({
            errors: err,
            data: data
        })
    })
});

/**
 * @route POST /product
 * @group Product - Operations about product
 * @param {string} name.required
 * @returns {Product.model} 200 - product info
 * @returns {Error}  default - Unexpected error
 */
router.get('/', function(req: Request, res: Response) {
    Product.find((err, data) => {
        res.send({
            errors: err,
            data: data
        })
    })
});


export {
    router as productsRouter
};
