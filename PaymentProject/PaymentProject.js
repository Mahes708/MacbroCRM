
const express = require("express");
const router = express.Router();
const PaymentProjectRouter = require("./PaymentProjectTable");

//Add
  
router.post("/",async(req,res) => {
    var data= new PaymentProjectRouter({ 
        client_name : req.body.client_name,
        projectID : req.body.projectID,
        PaymentDate :  req.body.PaymentDate,
        PaymentAmt :  req.body.PaymentAmt        
    });
    await data.save();
    res.json(data);
})

  

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await PaymentProjectRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await PaymentProjectRouter.update({_id:req.body._id}, { $set :{
        student_name : req.body.student_name,
        advance_date : req.body.advance_date, 
        student_photo :  req.body.student_photo,
        payment :  req.body.payment
    }});
    res.json(update);
})

//View
router.get("/:id", async(req,res)=>{
    var getData  = await PaymentProjectRouter.findById(req.params.id);  
     res.json(getData);  
 
 })
 router.get("/projectID/:id", async(req,res)=>{
    var getData  = await PaymentProjectRouter.find({projectID: req.params.id});
    res.json(getData);
      
 })


module.exports = router;