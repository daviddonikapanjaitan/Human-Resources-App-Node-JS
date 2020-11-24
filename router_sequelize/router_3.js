const express = require("express");
const router = express.Router();
const model = require("../models/index");

// GET Designation listing
router.get('/data-table', async function(req, res, next){
    try{
        const designation = await model.designation.findAll({});
        let arrayJson = [];
        let arrayChild = [];
        for(let i = 0; i < designation.length; i++){
            arrayChild = [];
            start = 0;
            arrayChild[start] = designation[i].id.toString();
            arrayChild[start + 1] = designation[i].sl;
            arrayChild[start + 2] = designation[i].designation;
            arrayChild[start + 3] = designation[i].details;

            arrayJson[i] = arrayChild;
        }
        console.log(JSON.stringify(arrayJson));
        if(designation.length !== 0){
            res.json({
                'status':'OK',
                'messages':'',
                'data': arrayJson
            });
        }else{
            res.json({
                'status':'ERROR',
                'messages':'EMPTY',
                'data':{}
            });
        }
    }catch(err){
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

// GET Designation by ID
router.get('/:id', async function(req, res, next){
    try{
        const designation = await model.designation.findAll({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if(designation){
            res.json({
                'status': 'OK',
                'messages': '',
                'count': designation
            });
        }
    }catch(err){
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

// Post Designation
router.post("/", async function(req, res, next){
    try{
        const {
            sl,
            designation,
            details,
        } = req.body;
        const add_designation = await model.designation.create({
            sl,
            designation,
            details
        }); 
        if(add_designation){
            res.status(201).json({
                'status':'OK',
                'messages':'Designation has been added',
                'data':{
                    sl: sl,
                    designation: designation,
                    details: details
                }
            });
        }else{
            res.status(201).json({
                'status':'ERR'
            });
        }
    }catch(err){
        if(err){
            res.status(400).json({
                'status':'ERROR',
                'messages':err.message,
                'data':{}
            });
        }
    }
});

// Patch Designation
router.patch("/:id", async function(req, res, next){
    try{
        const {
            sl,
            designation,
            details,
        } = req.body;
        const update_designation = await model.designation.update({
            sl,
            designation,
            details
        }, {
            where: {
                id: req.params.id
            }
        }); 
        if(update_designation){
            res.status(201).json({
                'status':'OK',
                'messages':'Designation has been added',
                'data':{
                    sl: sl,
                    designation: designation,
                    details: details
                }
            });
        }else{
            res.status(201).json({
                'status':'ERR'
            });
        }
    }catch(err){
        if(err){
            res.status(400).json({
                'status':'ERROR',
                'messages':err.message,
                'data':{}
            });
        }
    }
});

// Delete by ID 
router.delete("/:id", async function(req, res, next){
    try {
        const desination_id = parseInt(req.params.id);
        const designation = await model.designation.destroy({ where: {
          id: desination_id
        }})
        if (designation) {
          res.json({
            'status': 'OK',
            'messages': 'User berhasil dihapus',
            'data': designation,
          })
        }
      } catch (err) {
        res.status(400).json({
          'status': 'ERROR',
          'messages': err.message,
          'data': {},
        })
      }
});

module.exports = router;