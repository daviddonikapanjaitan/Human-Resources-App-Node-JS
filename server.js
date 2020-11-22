const express = require("express");
const session = require("express-session");
const app = express();
const pasport = require("passport");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const users = require("./router_sequelize/router_1");
const employee = require("./router_sequelize/router_2");
const getapi = require("./router_sequelize/router_api");
const dashboard = require("./router_dashboard/controller_dashboard");
const controller_login_system = require("./router_login_system/controller_login_system");
const passport = require('passport');
const mustacheExpress = require("mustache-express");
require("./router_login_system/passport")(passport);

// https://medium.com/skyshidigital/membuat-restful-api-menggunakan-express-dan-sequelize-ef0e10da36ff

app.engine("html", mustacheExpress());

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

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
app.use('/api/employee', employee);
app.use('/api/middleware', getapi);
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