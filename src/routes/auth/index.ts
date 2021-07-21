// @ts-ignore
import bcrypt from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";
import express, {Request, Response} from 'express';
import {warningLog, errorLog, infoLog} from "../../utils/logger";
import {UserModel} from "../../models/UserModel";

const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.post('/', async function(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        warningLog(email)
        const user = await UserModel.findOne({ email });

        bcrypt.compare(password, user.password, (err: string, isValid: boolean) => {
            if(err){
                errorLog(err)
            }

            if (!isValid) {
                console.log('err', err)
                console.log('isValid', isValid)
                console.log('user', user)
                return res.status(403).send("Wrong credentials");
            }

            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;
            delete user.password
            warningLog(`user ${user.email} was authorized` )
            // return authorized user
            res.status(201).json(user);
        });
    } catch (err) {
        errorLog(err);
    }
});


export {
    router as authRouter
};