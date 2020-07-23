
const express = require("express");
const router = express.Router();
const PaymentRouter = require("./PaymentTable");

//Add
 
router.post("/",async(req,res) => {
    var data= new PaymentRouter({ 
        traineName : req.body.traineName,
        traineID : req.body.traineID,
        PaymentDate :  req.body.PaymentDate,
        PaymentAmt :  req.body.PaymentAmt        
    });
    await data.save();
    res.json(data);
})

  

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await PaymentRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await PaymentRouter.update({_id:req.body._id}, { $set :{
        student_name : req.body.student_name,
        advance_date : req.body.advance_date, 
        student_photo :  req.body.student_photo,
        payment :  req.body.payment
    }});
    res.json(update);
})

//View
router.get("/:id", async(req,res)=>{
    var getData  = await PaymentRouter.findById(req.params.id);  
     res.json(getData);  
 
 })
 router.get("/traineID/:id", async(req,res)=>{
    var getData  = await PaymentRouter.find({traineID: req.params.id});
    res.json(getData);
      
 })
 


module.exports = router;