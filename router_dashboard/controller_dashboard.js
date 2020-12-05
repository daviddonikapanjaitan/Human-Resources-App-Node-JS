const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const mustache = require("mustache");
const { ensureAuthenticated } = require("../router_login_system/auth");

// dashboard
router.get("/", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "dashboard.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

// mustache hello world
router.get("/hello-world", async function (req, res, next){
    try{
        let json = {
            name: "David",
            value: false,
        }
        res.render('hello', json);
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

// Managed user ensureAuthenticated
router.get("/manage-user", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "manage-user.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

// Example HTML
router.get("/example", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "example.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

// Example HTML
router.get("/add-employee", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "add-employee.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

router.get("/benefits", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "benefits.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

router.get("/manage-designation", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "manage-designation.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

// Jquery UI
router.get("/autocomplete", async function(req, res, next){
    try{
        res.sendFile(
            path.resolve(
                __dirname, 
                "../template", 
                "dashboard",
                "jquery_ui.html"
        ));
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: "Tejadi Kesalahan"});
        }
    }
});

module.exports = router;