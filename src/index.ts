require("dotenv").config();
require("./db_connection").connect();
import {authRouter, productsRouter, registerRouter, userRouter} from './routes';
const express = require('express')
const app = express();

const {infoLog} = require("./utils/logger");
const port = 8080;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/register', registerRouter);
app.use('/product', productsRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    infoLog(`Server started on ${port} port`)
})