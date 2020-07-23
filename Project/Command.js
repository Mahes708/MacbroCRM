const express = require("express");
const router = express.Router();
const ProjectCommandRouter = require("./CommandTable"); 
 

//Post
router.post("/",async(req,res) => {
    var data= new ProjectCommandRouter({ 
       projectID : req.body.projectID,
        Commanddate : req.body.Commanddate,
        command : req.body.command
 });
    await data.save();
    res.json(data);
})

 
//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await ProjectCommandRouter.find();
    res.json(GetAllData);
})

//Command View
router.get("/projectID/:id", async(req,res)=>{
    var getData  = await ProjectCommandRouter.find({projectID: req.params.id});
    res.json(getData);
      
 })

 
module.exports = router;
