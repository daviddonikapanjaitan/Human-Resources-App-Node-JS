const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
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

module.exports = router;