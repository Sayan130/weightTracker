const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");

module.exports = function (passport){
    
    passport.use("Local", new localStrategy({
        usernameField: 'Email',
        passwordField: 'password'

    }, async function(username, password, done){
        
        console.log(username);
        let currentUser = await UserModel.findOne({email: username, password: password});
        
         if(currentUser == null)
             return  done(null, false);
    
        else
            return done(null, currentUser);
    
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