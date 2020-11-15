const express = require("express");
const router = express.Router();
const passport = require("passport");

// login system validation
router.post("/login-validation", async function(req, res, next){
    try{
        console.log(req.body);
        // passport.authenticate('local', {
        //     successRedirect: '/dashboard',
        //     failureRedirect: '/',
        //     failureFlash : true
        // })(req, res, next);
        passport.authenticate('local', function(err, user, info){
            if(user){
                req.logIn(user, function(err){
                    console.log("Login Validation: " + info.message);
                    res.redirect("/dashboard");
                });
            }else{
                console.log("Login Validation: " + info.message);
                res.redirect("/login-failure/" + info.message);
            }
        })(req, res, next);
    }catch(err){
        if(err){
            console.log(err);
            res.json({err: "Error", errdesc: err.messages});
        }
    }
});

//logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/'); 
});

module.exports = router;