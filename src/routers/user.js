let express = require("express");
let userRouter = new express.Router();
const User = require("../models/user");
const passport = require("passport");
const weightAdd = require("../models/weightAdd");
userRouter.get("/signup", (req, res)=>{

    res.render("signup", {user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated});

});
userRouter.get("/login", (req, res, next)=>{
    res.render("login", {user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated});
});


userRouter.post("/signup", async(req, res)=>{
    try{
    console.log(req.body.User);
    let result = new User({name: req.body.User, email: req.body.Email, password: req.body.password});
    await result.save();
    res.send({sucess: true});
    }catch(err){
        res.send({sucess: true})
    }
});

userRouter.post("/login",passport.authenticate('Local', {failureRedirect:'/login'}), (req, res)=>{
    
    res.render("header", {user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated});
});

userRouter.get("/report",isAuthenticated, (req, res)=>{
    res.render("report", {user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated});
});

userRouter.get("/getReport", isAuthenticated, async(req, res)=>{

    let result = await weightAdd.findOne({userid: req.user.id},{userdetails: 1, _id: 0 });
    res.send({user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated, result: result});
});
userRouter.post("/addWeight",isAuthenticated, async(req, res)=>{

    try{
        let result = await weightAdd.findOne({userid: req.user._id});
        let userdetails = {weight: req.body.weight, date: req.body.date}; 
        console.log(userdetails);   
        if(result == undefined)
            
            result = new weightAdd({userid: req.user._id, userdetails});        
        else
            result.userdetails.push(userdetails);

       
       await result.save();
            
       res.redirect("/report");

    }
    catch(err){
        console.log(err);
        res.render("header",{user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated});
    }

})

userRouter.get("/logout", isAuthenticated, (req, res)=>{
    req.logout();
    res.redirect("/");
})



function isAuthenticated(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect("/login");
    }
}
module.exports = userRouter;