import express, {Request, Response} from 'express';
import {errorLog, infoLog, warningLog} from "../../utils/logger";
import {Product} from "../../models/Product";
import {IRequestWithToken} from "../../types";
import {check, validationResult} from "express-validator";
import mongoose from "mongoose";

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
 * @route GET /product
 * @group Product - Operations about product
 * @returns {Product.model} 200 - product info
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', check('id').isMongoId(), async (req: Request, res: Response) => {
    try {
        validationResult(req).throw()
        const id = new mongoose.Types.ObjectId(req.params.id);

        const product = await Product.findById(id)
        if(product){
            infoLog('product exist')
            res.send({data: product, errors: null})
        }else{
            errorLog('product not exist')
            res.status(404).json({data: null, errors:  [{
                    "msg": `Product with ID ${req.params.id} not found`,
                    "param": "id",
                    "location": "query"
                }]})
        }
    }catch ({errors}){
        res.status(400).json({errors});
    }
});
/**
 * @route POST /product
 * @group Product - Operations about product
 * @param {string} name.required
 * @returns {Product.model} 200 - product info
 * @returns {Error}  default - Unexpected error
 */
router.post('/', check(['name', 'category', 'img_src', 'price', 'currency']), async (req: IRequestWithToken, res: Response) => {
    try{
        validationResult(req).throw();
        const createdProduct = await Product.create(req.body)
        if(createdProduct){
            res.send(createdProduct);
        }else{
            res.status(400);
        }
    }catch ({errors}){
        res.status(400).json({errors});
    }
});


export {
    router as productsRouter
};
