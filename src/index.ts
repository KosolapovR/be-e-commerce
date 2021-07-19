require("dotenv").config();
require("./db_connection").connect();
import {registerRouter} from "routes/register";
import {authRouter} from "routes/auth";
const express = require('express')
const app = express();

const {infoLog} = require("./utils/logger");
const port = 8080;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/register', registerRouter);

app.listen(port, () => {
    infoLog(`Server started on ${port} port`)
})