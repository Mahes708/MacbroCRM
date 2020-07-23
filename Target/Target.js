const express = require("express");
const router = express.Router();
const TargetRouter = require("./TargetTable");
 

//Add
 
router.post("/",async(req,res) => {
    var data= new TargetRouter({ 
        User_id : req.body.User_id,
        UserName : req.body.UserName,
        From_date :  req.body.From_date,
        To_date :  req.body.To_date,
        Target :  req.body.Target         
        
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await TargetRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => { 
    console.log(req)    
    var update = await TargetRouter.updateMany({_id:req.body._id}, { $set :{
        User_id : req.body.User_id,
        UserName : req.body.UserName,
        From_date :  req.body.From_date,
        To_date :  req.body.To_date,
        Target :  req.body.Target 
    }});
    res.json(update);
})

//View
router.get("/:id", async(req,res)=>{
    var getData  = await TargetRouter.findById(req.params.id);  
     res.json(getData);  
 
 })



module.exports = router;