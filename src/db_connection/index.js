const mongoose = require("mongoose");
const {infoLog} = require("../utils/logger");
const {errorLog} = require("../utils/logger");
const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            infoLog("Successfully connected to database")
        })
        .catch((error) => {
            errorLog("database connection failed. exiting now...");
            errorLog(error);
            process.exit(1);
        });
};