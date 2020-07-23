const express = require("express");
const router = express.Router();
const TrainingRouter = require("./TrainingTable");
 

//Add
 
router.post("/",async(req,res) => {
    var data= new TrainingRouter({ 
        name : req.body.name,
        mobile : req.body.mobile,
        email :  req.body.email,
        dob :  req.body.dob,
        college : req.body.college,
        Student_Graduate : req.body.Student_Graduate,
        passing :  req.body.passing,
        experience :  req.body.experience,
        course_offered : req.body.course_offered,
        fees_offered : req.body.fees_offered,
        status :  req.body.status,
        address :  req.body.address,
        remarks :  req.body.remarks,
        createdTime: req.body.createdTime         
        
    });
    data.createdTime instanceof Date;
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await TrainingRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => {     
    
    var TraineID =req.body.traineID;
    var ID = req.body._id;
    console.log(TraineID);
    console.log(ID);
    if(ID!=='undefined')
    {
        console.log("hello i am if")
        var update = await TrainingRouter.updateMany({_id:req.body._id}, { $set :{
        name : req.body.name,
        mobile : req.body.mobile,
        email :  req.body.email,
        dob :  req.body.dob,
        college : req.body.college,
        Student_Graduate : req.body.Student_Graduate,
        passing :  req.body.passing,
        experience :  req.body.experience,
        course_offered : req.body.course_offered,
        fees_offered : req.body.fees_offered,
        status :  req.body.status,
        address :  req.body.address,         
        remarks :  req.body.remarks  
    }});
    }
    if(TraineID!='')
    {
        console.log("hello i am else")
        var update = await TrainingRouter.updateOne({_id:TraineID}, { $set :{
        status :  req.body.status      
    }});
    }
    console.log(update)
        res.json(update);
    })

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await TrainingRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

//View
router.get("/:id", async(req,res)=>{
    var getData  = await TrainingRouter.findById(req.params.id);
    res.json(getData);      
 })

 //Search All
 router.get("/SearchAll/:FromDate/:ToDate/:name/:email", async(req,res)=>{
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate);
    var getData  = await TrainingRouter.find({ createdTime: {$gte: start, $lte: end} ,name: req.params.name, email:req.params.email });
    res.json(getData);      
 })

 //Search Date
 router.get("/SearchDate/:FromDate/:ToDate", async(req,res)=>{    
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate); 
    console.log(start) 
    console.log(end)   
    var getData  = await TrainingRouter.find({ createdTime: {$gte: start, $lte: end} });
    res.json(getData);      
 })

  //Search Date and Name
  router.get("/SearchDateName/:FromDate/:ToDate/:name", async(req,res)=>{    
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate); 
    console.log(start) 
    console.log(end)   
    var getData  = await TrainingRouter.find({ createdTime: {$gte: start, $lte: end},name: req.params.name });
    res.json(getData);      
 })

   //Search Date and Email
   router.get("/SearchDateEmail/:FromDate/:ToDate/:email", async(req,res)=>{    
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate); 
    console.log(start) 
    console.log(end)   
    var getData  = await TrainingRouter.find({ createdTime: {$gte: start, $lte: end} ,email: req.params.email});
    res.json(getData);      
 })
 
 //Search Name and Email
router.get("/SearchNameEmail/:name/:email", async(req,res)=>{
    var getData  = await TrainingRouter.find({name: req.params.name, email:req.params.email });
    res.json(getData);      
 })

  //Search Email
router.get("/SearchEmail/:email", async(req,res)=>{
    var getData  = await TrainingRouter.find({email:req.params.email });
    res.json(getData);      
 })

  //Search Name
router.get("/SearchName/:name", async(req,res)=>{
    var getData  = await TrainingRouter.find({name: req.params.name });
    res.json(getData);      
 })
  //Get All dashboard
router.get("/recentdata/:id",async(req,res)=>{
    var  GetAllData = await TrainingRouter.find().sort({_id:-1}).limit(5);
    res.json(GetAllData);
})

 
 module.exports = router;