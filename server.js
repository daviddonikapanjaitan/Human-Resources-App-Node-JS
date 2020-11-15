const express = require("express");
const session = require("express-session");
const app = express();
const pasport = require("passport");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const users = require("./router_sequelize/router_1");
const dashboard = require("./router_dashboard/controller_dashboard");
const controller_login_system = require("./router_login_system/controller_login_system");
const passport = require('passport');
require("./router_login_system/passport")(passport);

app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(express.static("static"));

app.use(session({
    secret: 'secret',
    cookie:{_expires : 86400000},
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/addrbook', users);
app.use('/controller', controller_login_system);
app.use('/dashboard', dashboard);

app.get("/login-failure/:message", (req, res, next) => {
    console.log(req.params.message);
    res.sendFile(
    path.resolve(
        __dirname, 
        "template", 
        "login-failure.html"
    ));
});

app.get("/", (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("/dashboard");
    } else{
        res.sendFile(
            path.resolve(
                __dirname, 
                "template", 
                "login.html"
            ));
    }
});

app.listen(3000);