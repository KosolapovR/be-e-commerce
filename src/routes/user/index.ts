import express, {Request, Response} from 'express';
import {errorLog, warningLog} from "../../utils/logger";
import {protectedRoute} from "../../middlewares/protectedRoute";
import upload from "../../middlewares/uploadFile"
import {UserModel} from "../../models/UserModel";
import {IRequestWithToken} from "../../types";

const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.use(protectedRoute);

router.get('/', function(req: Request, res: Response) {
        res.send('protected data')
});
router.post('/avatar', async function (req: IRequestWithToken, res: Response) {
    const {token} = req;
    try {
        await upload(req, res);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        const docs = await UserModel.findByIdAndUpdate(req.user_id,{$set:{avatar:req.file.filename}},{new:true})

        if(!docs){
            errorLog('no such user exist')
        }

        return res.send(`File has been uploaded.`);
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload image: ${error}`);
    }
})

router.get('/avatar', function(req: Request, res: Response) {
    // var thumb = new Buffer(result.image.data).toString('base64');
    // res.render('index', { title: 'Express', img: thumb});
    // res.send('protected data')
});

export {
    router as userRouter
};
