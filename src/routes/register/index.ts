// @ts-ignore
import bcrypt from "bcrypt";
// @ts-ignore
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from 'express';
import {UserModel} from "../../models/UserModel";

const {errorLog} = require("../../utils/logger");
const {warningLog} = require("../../utils/logger");
const router = express.Router();

router.use(function timeLog(req: Request, res: Response, next: NextFunction) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.post('/', async function(req: Request, res: Response) {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await UserModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        warningLog('created user')

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

        // return new user
        res.status(201).json(user);
    } catch (err) {
        errorLog(err);
    }
});


export {
    router as registerRouter
};