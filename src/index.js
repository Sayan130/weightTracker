const secretKeyForSession = "Sayan";
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const tracker = require("./routers/tracker");
const  user = require("./routers/user");
const bodyParser =  require("body-parser");
const passport = require("passport");
const session = require("express-session");
//Directory path
require("./dbConnection/db");
require("./config/passport")(passport);
const UserModel = require("./models/user");
require("./config/passport");
const path = require("path");
const res = path.join(__dirname, "/templates");
const static = path.join(__dirname, "/templates/static");
const env =  require("dotenv").config({path:path.join(__dirname, "../config/.env")});
app.use(require("express-session")({
    secret : process.env.secret,
    resave : false,
    saveUninitialized : false,
    cookie : {maxAge : 600000}
}));

//express middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(tracker);
app.use(user);
app.use(express.static(static));

//ejs engine
app.set("view engine", 'ejs');
app.set("views", res);


//localStrategy for passport
const pass = require("./config/passport");
pass(passport);

//index page 
app.get("/", (req, res)=>{
    console.log(req.session);
    res.render("header",{user: req.user=== undefined ? undefined: req.user.name, isLoggedIn: req.isAuthenticated});
});
app.get("*", (req, res)=>{
    res.send("What are you looking for brother ??????....");
})
app.listen(port, ()=>{
    console.log("Listening on port number "+`${port}`);
})

