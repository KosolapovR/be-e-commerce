const express = require('express');
const {warningLog} = require("../../utils/logger");
const router = express.Router();

router.use(function timeLog(req, res, next) {
    warningLog(`Time: ${Date.now()}`, )
    next();
});

router.get('/', function(req, res) {
    res.send('auth home page');
});


module.exports = router;