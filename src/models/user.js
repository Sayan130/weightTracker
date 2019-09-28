const mongoose = require("mongoose");

let schema = mongoose.Schema({

    name:{
        type: String,
    },

    email:{
        type: String,
    },

    password:{
        type: String,
    }


});
// schema.pre("save", function(next){




// });

const User = mongoose.model("User", schema);

module.exports = User; 