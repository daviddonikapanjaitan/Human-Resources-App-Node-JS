const express = require("express");
const router = express.Router();
const model = require("../models/index");
const md5 = require("md5");

function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// GET users listing 
router.get('/', async function(req, res, next){
    try{
        const x_addrbook = await model.x_addrbook.findAll({});
        let isdelete_false = {};
        for(let i = 0; i < x_addrbook.length; i++){
            if(!x_addrbook[i].is_delete){
                isdelete_false[i] = x_addrbook[i];
            }
        }
        if(x_addrbook.length !== 0){
            res.json({
                'status': 'OK',
                'messages': '',
                'data': isdelete_false
            });
        }else{
            res.json({
                'status': 'ERROR',
                'messages': 'EMPTY',
                'data': {}
            });
        }
    } catch(err){
        if(err){
            console.log(err);
            res.json({
                'status':'ERROR',
                'messages':err.messages,
                'data':{}
            });
        }
    }
});

// GET users listing Data Table
router.get('/data-table', async function(req, res, next){
    try{
        const x_addrbook = await model.x_addrbook.findAll({
            where:{
                is_delete: false
            }
        });
        let arrayJson = [];
        let arrayChild = [];
        let start = 0;
        for(let i = 0; i < x_addrbook.length; i++){
            if(!x_addrbook[i].is_delete){
                arrayChild = [];
                start = 0;
                arrayChild[start] = x_addrbook[i].email;
                arrayChild[start + 1] = x_addrbook[i].is_locked;
                arrayChild[start + 2] = x_addrbook[i].attempt;
                arrayChild[start + 3] = x_addrbook[i].fp_counter;
                arrayChild[start + 4] = x_addrbook[i].createdAt;
                arrayJson[i] = arrayChild;
            }
        }
        console.log(JSON.stringify(arrayJson));
        if(x_addrbook.length !== 0){
            res.json({
                'status': 'OK',
                'messages': '',
                'data': arrayJson
            });
        }else{
            res.json({
                'status': 'ERROR',
                'messages': 'EMPTY',
                'data': {}
            });
        }
    } catch(err){
        if(err){
            console.log(err);
            res.json({
                'status':'ERROR',
                'messages':err.messages,
                'data':{}
            });
        }
    }
});

// GET users by email
router.get('/:email', async function(req, res, next){
    try{
        const x_addrbook = await model.x_addrbook.findAll({
            where: {
                email: req.params.email,
                is_delete: false
            }
        });
        let isdelete_false = {};
        for(let i = 0; i < x_addrbook.length; i++){
            if(!x_addrbook[i].is_delete){
                isdelete_false[i] = x_addrbook[i];
            }
        }
        if(x_addrbook.length !== 0){
            res.json({
                'status': 'OK',
                'messages': '',
                'count': x_addrbook.length.toString(),
                'data': isdelete_false
            });
        }else{
            res.json({
                'status': 'ERROR',
                'messages': 'EMPTY',
                'data': {}
            });
        }
    } catch(err){
        if(err){
            console.log(err);
            res.json({
                'status':'ERROR',
                'messages':err.messages,
                'data':{}
            });
        }
    }
});

// POST users
router.post('/', async function(req, res, next){
    try{
        const { 
            // created_by,
            email,
            password,
        } = req.body;
        const x_addrbook_find_one = await model.x_addrbook.findAll({
            where:{
                email: email
            }
        });
        if(validateEmail(email)){
            if(x_addrbook_find_one.length > 0){
                res.status(201).json({
                    'status': 'ERR',
                    'messages': 'Email Sudah Ada'
                });
            }else{
                const x_addrbook = await model.x_addrbook.create({
                    created_by : "1",
                    is_delete:false,
                    is_locked: false,
                    attempt: 0,
                    email,
                    abuid: makeid(50),
                    abpwd: md5(password),
                    fp_token: makeid(100),
                    fp_expired_date : new Date,
                    fp_counter: 0
                });
                if(x_addrbook){
                    res.status(201).json({
                        'status': 'OK',
                        'messages': 'Email berhasil ditambahkan',
                        'data': {
                            "email": email,
                        }
                    });
                }
            }
        }else{
            res.status(201).json({
                'status': 'ERR',
                'messages': 'Format Email Salah'
            });
        }
    }catch(err){
        if(err){
            res.status(400).json({
                'status':'ERROR',
                'messages': err.message,
                'data':{}
            });
        }   
    }
});

// UPDATE users
router.patch('/', function(req, res, next){

});

// DELETE users
router.delete('/', function(req, res, next){

});


module.exports = router;