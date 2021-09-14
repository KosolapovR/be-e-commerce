// @ts-ignore
import bcrypt from "bcryptjs";
// @ts-ignore
import jwt from "jsonwebtoken";
import express, {Request, Response} from 'express';
import {warningLog, errorLog, infoLog} from "../../utils/logger";
import {User} from "../../models/User";
import _ from 'lodash'

const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

/**
 * @route POST /auth
 * @group Auth - Operations about auth
 * @param {string} email.body.required
 * @param {string} password.body.required
 * @returns {User.model} 201
 * @returns {Error}  400 - All input is required
 * @returns {Error}  403 - Wrong credentials
 */
router.post('/', async function(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        warningLog(email)
        const user = await User.findOne({ email });

        bcrypt.compare(password, user.password, (err: string, isValid: boolean) => {
            if(err){
                errorLog(err)
            }

            if (!isValid) {
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

            warningLog(`user ${user.email} was authorized` )
            warningLog(`token ${token}` )
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
