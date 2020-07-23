const express = require("express");
const router = express.Router();
const AgreementRouter = require("./AgreementTable"); 

//Add 
router.post("/",async(req,res) => {
    var data= new AgreementRouter({ 
        Trainee_id : req.body.Trainee_id,
        Name : req.body.Name,
        Type_course :  req.body.Type_course,
        Duration :  req.body.Duration,
        Comments :  req.body.Comments         
        
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await AgreementRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await AgreementRouter.update({_id:req.body._id}, { $set :{
        Trainee_id : req.body.Trainee_id,
        Name : req.body.Name,
        Type_course :  req.body.Type_course,
        Duration :  req.body.Duration,
        Comments :  req.body.Comments 
    }});
    res.json(update);
})

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await AgreementRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

module.exports = router;