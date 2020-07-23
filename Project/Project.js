const express = require("express");
const router = express.Router();
const ProjectRouter = require("./ProjectTable");
 

//Add 
router.post("/",async(req,res) => {
    var data= new ProjectRouter({ 
        client_name : req.body.client_name,
        mobile : req.body.mobile,
        email :  req.body.email,
        company_name :  req.body.company_name,
        project_type : req.body.project_type,
        cost : req.body.cost,
        address :  req.body.address,         
        status :  req.body.status         
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllData = await ProjectRouter.find();
    res.json(GetAllData);
})

//Update
router.put("/update", async(req,res) => { 

    var ProjectID =req.body.projectID;
    var ID = req.body._id;

    if(ID!=='undefined'){

    var update = await ProjectRouter.update({_id:req.body._id}, { $set :{
        client_name : req.body.client_name,
        mobile : req.body.mobile,
        email :  req.body.email,
        company_name :  req.body.company_name,
        project_type : req.body.project_type,
        cost : req.body.cost,
        address :  req.body.address,
        status :  req.body.status
    }});
}

 if(ProjectID!='')
    {
      //  console.log("hello i am else")
        var update = await ProjectRouter.updateOne({_id:ProjectID}, { $set :{
        status :  req.body.status      
    }});
    }
    res.json(update);
})

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await ProjectRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

//View
router.get("/:id", async(req,res)=>{
    var getData  = await ProjectRouter.findById(req.params.id);
    res.json(getData);
      
 })

 
 //Search All
 router.get("/SearchAll/:FromDate/:ToDate/:name/:email", async(req,res)=>{
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate);
    var getData  = await ProjectRouter.find({ createdTime: {$gte: start, $lte: end} ,client_name: req.params.name, email:req.params.email });
    res.json(getData);      
 })

 //Search Date
 router.get("/SearchDate/:FromDate/:ToDate", async(req,res)=>{    
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate); 
    console.log(start) 
    console.log(end)   
    var getData  = await ProjectRouter.find({ createdTime: {$gte: start, $lte: end} });
    res.json(getData);      
 })

  //Search Date and Name
  router.get("/SearchDateName/:FromDate/:ToDate/:name", async(req,res)=>{    
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate); 
    console.log(start) 
    console.log(end)   
    var getData  = await ProjectRouter.find({ createdTime: {$gte: start, $lte: end},client_name: req.params.name });
    res.json(getData);      
 })

   //Search Date and Email
   router.get("/SearchDateEmail/:FromDate/:ToDate/:email", async(req,res)=>{    
    var start = new Date(req.params.FromDate);
    var end = new Date(req.params.ToDate); 
    console.log(start) 
    console.log(end)   
    var getData  = await ProjectRouter.find({ createdTime: {$gte: start, $lte: end} ,email: req.params.email});
    res.json(getData);      
 })
 
 //Search Name and Email
router.get("/SearchNameEmail/:name/:email", async(req,res)=>{
    var getData  = await ProjectRouter.find({client_name: req.params.name, email:req.params.email });
    res.json(getData);      
 })

  //Search Email
router.get("/SearchEmail/:email", async(req,res)=>{
    var getData  = await ProjectRouter.find({email:req.params.email });
    res.json(getData);      
 })

  //Search Name
router.get("/SearchName/:name", async(req,res)=>{
    var getData  = await ProjectRouter.find({client_name: req.params.name });
    res.json(getData);      
 })
 //Get All dashboard
 router.get("/recentdata/:id",async(req,res)=>{
    var  GetAllData = await ProjectRouter.find().sort({_id:-1}).limit(5);
    res.json(GetAllData);
})

 
module.exports = router;