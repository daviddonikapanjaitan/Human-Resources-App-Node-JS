const express = require("express");
const moment = require("moment");
const router = express.Router();
const model = require("../models/index");

// GET Attendance listing
router.get("/data-table", async function(req, res, next){
    try{
        const attendance = await model.attendance.findAll({});
        let arrayJson = [];
        let arrayChild = [];
        for(let i = 0; i< attendance.length; i++){
            arrayChild = [];
            start = 0;
            arrayChild[start] = attendance[i].id.toString();
            arrayChild[start + 1] = attendance[i].employee_name;
            arrayChild[start + 2] = new Date(attendance[i].date+"UTC");
            arrayChild[start + 3] = attendance[i].check_in;
            arrayChild[start + 4] = attendance[i].check_out;
            arrayChild[start + 5] = attendance[i].stay_time;
            arrayJson[i] = arrayChild;
        }
        if(attendance){
            res.json({
                'status':'OK',
                'messages':'',
                'data':arrayJson
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

// Post Attendance
router.post("/", async function(req, res){
    try{
        const {
            employee_name,
            date,
            check_in,
            check_out,
            stay_time
        } = req.body;
        let newDate = moment(date, "DD-MM-YYYY").tz('Asia/Jakarta');
        const post_attendance = await model.attendance.create({
            employee_name,
            date: newDate,
            check_in,
            check_out,
            stay_time
        });
        if(post_attendance){
            res.status(201).json({
                'status':'OK',
                'messages':'Attendance has been added',
                'data':{
                    employee_name: employee_name,
                    date: date,
                    check_in: check_in,
                    check_out: check_out,
                    stay_time
                }
            });
        }
    }catch(err){
        if(err){
            res.status(400).json({
                'status':'ERROR',
                'messages':err.messages,
                'data':{}
            });
        }
    }
});

// Get Attendance by ID
router.get("/:id", async function(req, res, next){  
    try{
        const attendance = await model.attendance.findAll({
            raw:true,
            where:{
                id: parseInt(req.params.id)
            }
        });
        if(attendance){
            attendance[0].date = new Date(attendance[0].date+"UTC");
            attendance[0].createdAt = new Date(attendance[0].createdAt+"UTC");
            attendance[0].updatedAt = new Date(attendance[0].updatedAt+"UTC");
            res.json({
                'status':'OK',
                'data':attendance
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

// Patch Attendance
router.patch("/:id", async function(req, res, next){
    try{
        const {
            employee_name,
            date,
            check_in,
            check_out,
            stay_time
        } = req.body;
        let newDate = moment(date, "DD-MM-YYYY").tz('Asia/Jakarta');
        const patch_attendance = await model.attendance.update({
            employee_name,
            date: newDate,
            check_in,
            check_out,
            stay_time
        }, {
            where:{
                id: parseInt(req.params.id)
            }
        });
        if(patch_attendance){
            res.status(201).json({
                'status':'OK',
                'messages':'Attendance has been added',
                'data':{
                    employee_name: employee_name,
                    date: date,
                    check_in: check_in,
                    check_out: check_out,
                    stay_time: stay_time
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
                'messages':err.messages,
                'data':{}
            });
        }
    }
});

// Delete by ID
router.delete("/:id", async function(req, res, next){
    try{
        const attendance_id = parseInt(req.params.id);
        const attendance = await model.attendance.destroy({
            where:{
                id: attendance_id
            }
        });
        if(attendance){
            res.json({
                'status':'OK',
                'messages':"Attendance has been deleted",
                'data':attendance
            });
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            'status':'ERROR',
            'messages':err.messages,
            'data':{}
        });
    }
});

module.exports = router;