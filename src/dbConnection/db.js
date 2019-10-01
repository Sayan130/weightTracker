const mongoose = require("mongoose");
const env = require("dotenv");
const p = require("path");
env.config({path:p.join(__dirname, "../config/.env")});

mongoose.connect(process.env.db, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true
});