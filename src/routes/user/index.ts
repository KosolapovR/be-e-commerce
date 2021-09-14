import express, {Request, Response} from 'express';
import {errorLog, warningLog} from "../../utils/logger";
import upload from "../../middlewares/uploadFile"
import {User} from "../../models/User";
import {IRequestWithToken} from "../../types";
import getAvatar from "../../utils/imageRetriever/getAvatar";
import {protectedRoute} from "../../middlewares/protectedRoute";


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
    const {token} = req;
    try {
        await upload(req, res);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }


        const docs = await User.findOneAndUpdate({token},{$set:{avatar:req.file.filename}},{new:true})

        if(!docs){
            errorLog('no such user exist')
        }

        return res.send(`File has been uploaded.`);
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
})

/**
 * @route GET /user/avatar
 * @group User - Operations about user
 * @param {string} id - img filename
 * @returns {object} 200 - base64data
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/avatar/:id', async function(req: Request, res: Response) {
    const filename = req.params.id;
    const {error, data} = await getAvatar(filename)

    if(error){
        return res.sendStatus(404);
    }

    res.send({base64data: data})
});

export {
    router as userRouter
};
