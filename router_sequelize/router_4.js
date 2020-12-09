const express = require("express");
const router = express.Router();
const model = require("../models/index");

// GET Benefits listing
router.get("/data-table", async function(req, res, next){
    try{
        const benefits = await model.benefits.findAll({});
        let arrayJson = [];
        let arrayChild = [];
        for(let i = 0; i< benefits.length; i++){
            arrayChild = [];
            start = 0;
            arrayChild[start] = benefits[i].id.toString();
            arrayChild[start + 1] = benefits[i].salary_benefits;
            arrayChild[start + 2] = benefits[i].benefits_type;

            arrayJson[i] = arrayChild;
        }
        if(benefits.length !== 0){
            res.json({
                'status':'OK',
                'messages':'',
                'data':arrayJson
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

// Get Benefits by ID
router.get("/:id", async function(req, res, next){
    try{
        const benefits = await model.benefits.findAll({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if(benefits){
            res.json({
                'status':'OK',
                'messages':'',
                'data':benefits
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

// Post Benefits
router.post("/", async function(req, res, next){
    try{
        const {
            salary_benefits,
            benefits_type
        } = req.body;
        const post_benefits = await model.benefits.create({
            salary_benefits,
            benefits_type
        }); 
        if(post_benefits){
            res.status(201).json({
                'status':'OK',
                'messages':'Benefits has been added',
                'data':{
                    salary_benefits: salary_benefits,
                    benefits_type: benefits_type
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

// Patch Benefits
router.patch("/:id", async function(req, res, next){
    try{
        const {
            salary_benefits,
            benefits_type
        } = req.body;
        const update_benefits = await model.benefits.update({
            salary_benefits,
            benefits_type
        }, {
            where:{
                id: req.params.id
            }
        });
        if(update_benefits){
            res.status(201).json({
                'status':'OK',
                'messages':'Benefits has been added',
                'data':{
                    salary_benefits: salary_benefits,
                    benefits_type: benefits_type
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
router.delete("/:id", async function (req, res, next){
    try{
        const benefits_id = parseInt(req.params.id);
        const benefits = await model.benefits.destroy({
            where: {
                id: benefits_id
            }
        });
        if(benefits){
            res.json({
                'status':'OK',
                'messages':'Benefits has been deleted',
                'data':benefits
            });
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            'status':'ERROR',
            'messages':err.message,
            'data':{}
        });
    }
});

module.exports = router;