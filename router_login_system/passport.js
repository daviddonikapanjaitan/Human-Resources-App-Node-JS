const LocalStrategy = require("passport-local").Strategy;
const model = require("../models/index");
const md5 = require("md5");

const getEmailAddrBook = (email, password) => new Promise((resolve, reject) => {
    try{
        resolve(model.x_addrbook.findOne({
            where: {
                email: email
            }
        }));
    }catch(err){
        reject(err);
    };
});

const getFulValidationAddrBook = (email, password) => new Promise((resolve, reject) => {
    try{
        resolve(model.x_addrbook.findOne({
            where: {
                email: email,
                abpwd: md5(password)
            }
        }));
    }catch(err){
        reject(err);
    };
});

const getDetailUser = (id) => new Promise((resolve, reject) => {
    try{
        resolve(model.x_addrbook.findOne({
            where: {
                id: id
            }
        }));
    }catch(err){
        reject(err);
    };
});

const plusCounter = (id, counter) => new Promise((resolve, reject) => {
    try{
        resolve(model.x_addrbook.update({
            fp_counter: counter
        }, {
            where:{
                id: id
            }
        }));
    }catch(err){
        reject(err);
    }
});

const lockedAddrBook = (id) => new Promise((resolve, reject) => {
    try{
        resolve(model.x_addrbook.update({
            is_locked: true
        }, {
            where:{
                id: id
            }
        }));
    }catch(err){
        reject(err);
    }
});

async function local_strategy(email, password, done){
    const getEmail = await getEmailAddrBook(email);
    const getFullValidation = await getFulValidationAddrBook(email, password);
    if(getEmail){
        if(getFullValidation){
            if(getFullValidation.is_locked){
                console.log("Email Locked");
                return done(null, false, {message: 'Email Locked !!'});
            }else{
                console.log("ID: " + getFullValidation.id);
                let user = await getDetailUser(getFullValidation.id);
                let newUser = {
                    email: user.email,
                    id: user.id,
                    abuid: user.abuid
                }
                console.log(newUser);
                console.log("Login Success");
                return done(null, newUser, {message: "Login Success"});
            }
        } else {
            if(getEmail.fp_counter === 3){
                await lockedAddrBook(getEmail.id);
                console.log("Password Chance Wrong only 3 times !!");
                return done(null, false, {message: 'Password Chance Wrong only 3 times !!'});
            }else{
                await plusCounter(getEmail.id, (getEmail.fp_counter + 1));
                return done(null, false, {message: 'Password Wrong !! Chance is ' + (3 - (getEmail.fp_counter + 1))});
            }
        }
    } else {
        console.log("Email not found !!");
        return done(null, false, {message:'Email not found !!'});
    }
}

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
            local_strategy(email, password, done);
        })
    );

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done){
        console.log("ID: " + JSON.stringify(id));
        const getid_detail = await getDetailUser(id);
        let newUser = {
            email: getid_detail.email,
            id: getid_detail.id,
            abuid: getid_detail.abuid
        }
        console.log(newUser);
        done(null, newUser);
    });
}