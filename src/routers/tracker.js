const express = require("express")
const router = new express.Router();
const weight = require("../models/weightAdd");
require("../dbConnection/db");
router.post("/add", async(req, res)=>{

    try{
    
        let w = new weight({'weight' : req.body.weight, 'date' : req.body.date});
        console.log(w);
        await w.save();        
        res.status(200).send("stored successfully");

    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

module.exports = router;