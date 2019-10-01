const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
module.exports = function (passport){
    
    passport.use("Local", new localStrategy({
        usernameField: 'Email',
        passwordField: 'password'

    }, async function(username, password, done){
        
        
        let currentUser = await UserModel.findOne({email: username});

         if(currentUser == null)
             return  done(null, false,{message: "Invalid Email"});
    
        else{
            let result = await bcrypt.compare(password, currentUser.password);
            if(result)
                return done(null, currentUser);
            else 
                return  done(null, false, {message: "Invalid Passoword"});
        }
    }));
    passport.serializeUser(function(user, cb){

        cb(null, user.id);

    });


    passport.deserializeUser(async function(id, done){

         try{

            let user = await UserModel.findById({_id: id});
            done(null, user);
         }
         catch(err){

            done(null, false);
        }
    });   
};