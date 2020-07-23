const express = require("express");
const router = express.Router();
const TrainingAdvanceRouter = require("./AdvanceTable");


//Add
 
router.post("/",async(req,res) => {
    var data= new TrainingAdvanceRouter({ 
        traineID : req.body.traineID,
        advanceDate : req.body.advanceDate,
        advanceAmt :  req.body.advanceAmt,
        traineName :  req.body.traineName,         
        course_offered :  req.body.course_offered,
        fees_offered :  req.body.fees_offered        
    }); 
    await data.save();
    res.json(data);
}) 
//update
router.put("/update", async(req,res) => {  
     console.log(req.body.PaymentDate)   
    var update = await TrainingAdvanceRouter.updateMany({traineID:req.body.traineID}, { $push :{
        payment: { 
        traineID : req.body.traineID, 
        PaymentDate :  req.body.PaymentDate,
        PaymentAmt :  req.body.PaymentAmt  }
    }});
    res.json(update);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await TrainingAdvanceRouter.find();
    res.json(GetAllData);
})
//View
router.get("/:id", async(req,res)=>{
    var getData  = await TrainingAdvanceRouter.findById(req.params.id);
    res.json(getData);      
 })
module.exports = router;