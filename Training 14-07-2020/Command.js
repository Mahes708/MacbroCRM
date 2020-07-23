const express = require("express");
const router = express.Router();
const TraineCommandRouter = require("./CommandTable"); 
 

//Post
router.post("/",async(req,res) => {
    var data= new TraineCommandRouter({ 
        traineID : req.body.traineID,
        Commanddate : req.body.Commanddate,
        command : req.body.command
 });
    await data.save();
    res.json(data);
})

 
//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await TraineCommandRouter.find();
    res.json(GetAllData);
})

//Command View
router.get("/traineID/:id", async(req,res)=>{
    var getData  = await TraineCommandRouter.find({traineID: req.params.id});
    res.json(getData);
      
 })

 
module.exports = router;
