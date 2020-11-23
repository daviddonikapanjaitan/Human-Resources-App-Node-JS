const express = require("express");
const router = express.Router();
const model = require("../models/index");

// GET users listing
router.get('/data-table', async function(req, res, next){
    try{
        const employee = await model.employee.findAll({});
        let arrayJson = [];
        let arrayChild = [];
        let start = 0;
        for(let i = 0; i < employee.length; i++){
            arrayChild = [];
            start = 0;
            arrayChild[start] = employee[i].id;
            arrayChild[start + 1] = employee[i].first_name;
            arrayChild[start + 2] = employee[i].last_name;
            arrayChild[start + 3] = employee[i].designation;
            arrayChild[start + 4] = employee[i].phone;
            arrayChild[start + 5] = employee[i].rate_type;

            arrayChild[start + 6] = employee[i].hour_rate_salary;
            arrayChild[start + 7] = employee[i].email;
            arrayChild[start + 8] = employee[i].blood_group;
            arrayChild[start + 9] = employee[i].address_line_1;
            arrayChild[start + 10] = employee[i].address_line_2;

            arrayChild[start + 11] = employee[i].country;
            arrayChild[start + 12] = employee[i].city;
            arrayChild[start + 13] = employee[i].zip_code;
            arrayChild[start + 14] = employee[i].address_line_2;

            arrayJson[i] = arrayChild;
        }
        console.log(JSON.stringify(arrayJson));
        if(employee.length !== 0){
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

// POST Employee
router.post('/', async function(req, res, next){
    try{
        const {
            first_name,
            last_name,
            designation,
            phone,
            rate_type,
            hour_rate_salary,
            email,
            blood_group,
            address_line_1,
            address_line_2,
            country,
            city,
            zip_code,
            picture,
        } = req.body;
        let pictureBlob = Buffer.from(picture, "base64");
        const add_employee = await model.employee.create({
            first_name,
            last_name,
            designation,
            phone,
            rate_type,
            hour_rate_salary,
            email,
            blood_group,
            address_line_1,
            address_line_2,
            country,
            city,
            zip_code,
            picture:pictureBlob
        });
        if(add_employee){
            res.status(201).json({
                'status':'OK',
                'messages':'Employee has been added',
                'data':{
                    "first_name":first_name,
                    "last_name":last_name
                }
            });
        }else{
            res.status(201).json({
                'status': 'ERR',
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
router.delete('/:id', async function (req, res, next) {
    try {
      const employee_id = req.params.id;
      const employee = await model.employee.destroy({ where: {
        id: employee_id
      }})
      if (employee) {
        res.json({
          'status': 'OK',
          'messages': 'Employee has beend deleted',
          'data': employee,
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

// GET employee by ID
router.get('/:id', async function(req, res, next){
    try{
        const employee = await model.employee.findAll({
            where: {
                id: parseInt(req.params.id)
            }
        });
        if(employee){
            res.json({
                'status': 'OK',
                'messages': '',
                'count': employee
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

router.patch('/:id', async function (req, res, next) {
    try {
      const employee_id = req.params.id;
      const {
        first_name,
        last_name,
        designation,
        phone,
        rate_type,
        hour_rate_salary,
        email,
        blood_group,
        address_line_1,
        address_line_2,
        country,
        city,
        zip_code,
        picture,
      } = req.body;
      let pictureBlob = Buffer.from(picture, "base64");
      const update_employee = await model.employee.update({
        first_name,
        last_name,
        designation,
        phone: parseInt(phone),
        rate_type,
        hour_rate_salary,
        email,
        blood_group,
        address_line_1,
        address_line_2,
        country,
        city,
        zip_code,
        picture:pictureBlob
      }, {
        where: {
          id: employee_id
        }
      });
      if (update_employee) {
        res.json({
          'status': 'OK',
          'messages': 'Employee has been updated',
          'data': update_employee,
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