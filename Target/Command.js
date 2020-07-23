const express = require("express");
const router = express.Router();
const TargetCommandRouter = require("./CommandTable"); 
 

//Post
router.post("/",async(req,res) => {
    var data= new TargetCommandRouter({ 
        TargetID : req.body.TargetID,
        Commanddate : req.body.Commanddate,
        command : req.body.command
 });
    await data.save();
    res.json(data);
})

 
//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await TargetCommandRouter.find();
    res.json(GetAllData);
})

//Command View
router.get("/TargetID/:id", async(req,res)=>{
    var getData  = await TargetCommandRouter.find({TargetID: req.params.id});
    res.json(getData);
      
 })

 
module.exports = router;
