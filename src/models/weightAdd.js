const mongoose = require("mongoose");

const weightSchema = mongoose.Schema({
    
    userid:{
        type: String
    },
    userdetails:[
        {weight : {
            type : Number,
            require : true,
        },
        date : {
            type : Date,
            require: true
        }
    }]
    
});

const weight = mongoose.model("weightdb", weightSchema);
module.exports = weight;