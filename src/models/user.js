const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const vali = require("validator");

let schema = mongoose.Schema({

    name:{
        type: String,
    },

    email:{
        type: String,
        unique: true,
        validate: {
            validator:function(v){
                if(!vali.isEmail(v))
                    throw new Error("invalid mail ID");
            }
        }
    },

    password:{
        type: String,
        minlength: 6
    }


});
schema.pre("save", async function(next){
    try{
        this.password =  await bcrypt.hash(this.password, 8);
        next();
    }
    catch(err){
        console.log(err);
        res.redirect("/signup");
    }

});

const User = mongoose.model("User", schema);

module.exports = User; 