const express = require("express");
const router = express.Router();
const EmployeeRouter = require("./EmployeeTable");

//Add

router.post("/",async(req,res) => {
    var data= new EmployeeRouter({
        photo : req.body.photo,
        Employee_name : req.body.Employee_name,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        dob : req.body.dob,
        department : req.body.department,
        experience : req.body.experience,
        doj : req.body.doj,
        address : req.body.address
        
    });
    await data.save();
    res.json(data);
})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllEmployee = await EmployeeRouter.find();
    res.json(GetAllEmployee);
})

//Update
router.put("/update", async(req,res) => {     
    var update = await EmployeeRouter.update({_id:req.body._id}, { $set :{
        photo : req.body.photo,
        Employee_name : req.body.Employee_name,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        dob : req.body.dob,
        department : req.body.department,
        experience : req.body.experience,
        doj : req.body.doj,
        address : req.body.address
    }});
    res.json(update);
})

//Delete
router.delete("/del/:id", async(req,res)=>{
    var deleteData  = await EmployeeRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message : "Deleted Successfully"});
    })
})

router.get("/:id", async(req,res)=>{
   var getData  = await EmployeeRouter.findById(req.params.id);
   res.json(getData);
     
})

module.exports = router;