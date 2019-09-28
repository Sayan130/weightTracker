const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/weightTracker", {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true
});