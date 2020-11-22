const { default: Axios } = require("axios");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/all-country", async function(req, res, next){
    try{
        await axios.get('https://api.first.org/data/v1/countries').then((response) => {
            // let listData = [];
            // let i = 0;
            // for(key in response.data.data){
            //     if(response.data.data.hasOwnProperty(key)){
            //         listData[i] = response.data.data[key];
            //         i++;
            //     }
            // }
            res.send(response.data);
        }, (error) => {
            console.log(error.message);
        });
    }catch(err){
        if(err){
            console.log(err);
        }
    }
});

module.exports = router;