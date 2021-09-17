import express, {Request, Response} from 'express';
import {errorLog, warningLog} from "../../utils/logger";
import upload from "../../middlewares/uploadFile"
import {User} from "../../models/User";
import {IRequestWithToken} from "../../types";
import getAvatar from "../../utils/imageRetriever/getAvatar";
import {protectedRoute} from "../../middlewares/protectedRoute";
import {IUser} from "../../interfaces/User";
import {IOrder} from "../../interfaces/Order";
import {check, oneOf, validationResult,} from "express-validator";
import {Order} from "../../models/Order";
import {Error} from "mongoose";


const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.use(protectedRoute);

/**
 * @route POST /user
 * @group User - Operations about user
 * @param {string} first_name.body
 * @param {string} last_name.body
 * @param {string} email.body.required
 * @param {string} password.body.required
 * @param {string} avatar.body
 * @returns {User.model} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/', function(req: Request, res: Response) {
    res.send('protected data')
});

router.get('/', function(req: Request, res: Response) {
        res.send('protected data')
});

/**
 * @route POST /user/avatar
 * @group User - Operations about user
 * @property {object} file - file info
 * @returns {string} 200 - uploading status
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/avatar', async function (req: IRequestWithToken, res: Response) {
    try {
        await upload(req, res);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        User.findOneAndUpdate({_id: req.user_id},{$set:{avatar:req.file.filename}},{new:true}, (err, doc) =>{
            if(err){
                console.log(err);
                return res.send(`Error when trying upload image: ${err}`);
            }

            if(!doc){
                errorLog('no such user exist')
                return res.send(`no such user exist`);
            }

            return res.send({data: doc});
        })


    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
})

/**
 * @route GET /user/avatar
 * @group User - Operations about user
 * @returns {object} 200 - base64data
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/avatar', async function(req: IRequestWithToken, res: Response) {
    const userDoc: IUser = await User.findById(req.user_id)
    if(!userDoc){
        return res.sendStatus(404);
    }
    const filename = userDoc.avatar;
    const {error, data} = await getAvatar(filename)

    if(error){
        return res.sendStatus(404);
    }

    res.send({data})
});

export {
    router as userRouter
};

/**
 * @route POST /user/order
 * @group User - Operations about user
 * @param {string} openDate.body.required
 * @param {string} totalAmount.body.required
 * @param {number} quantity.body.required
 * @param {string} trackingNumber.body
 * @param {string} deliveryStatus.body
 * @param {string} currency.body
 * @param {Array.<Product>} products.body
 * @param {DeliveryMethod.model} deliveryMethod.body.required
 * @param {PaymentMethod.model} paymentMethod.body.required
 * @param {ShippingAddress.model} shippingAddress.body.required
 * @returns {string} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/order', check(['openDate', 'totalAmount', 'deliveryMethod', 'paymentMethod', 'quantity', 'shippingAddress', 'products']).notEmpty(), async (req: IRequestWithToken, res: Response) => {
    try {
        validationResult(req).throw();
        const {openDate, totalAmount, currency, deliveryMethod, deliveryStatus, paymentMethod, quantity, shippingAddress, trackingNumber, products } : IOrder = req.body

        const createdOrder = await Order.create({openDate, totalAmount, currency, deliveryMethod, deliveryStatus, paymentMethod, quantity, shippingAddress, trackingNumber, products })
        if(createdOrder){
            const {user_id} = req
            User.findByIdAndUpdate(user_id, {$push: {"orders": createdOrder}},
                {new: true}, (err: Error, doc: IUser) => {
                if(!doc || err){
                    res.status(400).json({error: `cannot add order to user`});
                }
                if(doc){
                    res.send({data: doc});
                }
            })
        }else{
            res.status(400);
        }
    } catch ({errors}) {
        res.status(400).json({errors});
    }
})
