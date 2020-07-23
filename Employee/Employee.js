const express = require("express");
const router = express.Router();
const EmployeeRouter = require("./EmployeeTable");
const fileUpload = require('express-fileupload'); 
const app = express();
router.use(fileUpload());
JSON.stringify()

//Add
router.post("/",(req,res) => {
   
  var filename 
  var files =req.files;      
      if(!files)
      {       
          filename = ''
      }  
      else
      {
        var datetimestamp = Date.now();        
        const file = req.files.photo;
        file.mv(`${__dirname}/../client/public/uploads/Employee/${datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            } 
          })   
          filename = datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]
      } 
      console.log(req.body)
      
    var data= new EmployeeRouter({       
        photo : filename,
        Employee_code : req.body.Employee_code,
        Employee_name : req.body.Employee_name,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        dob : req.body.dob,
        department :  req.body.department,
        experience : req.body.experience,
        doj : req.body.doj,
        address : req.body.address
        
    });
    data.save();
    res.json(data);

})

//Get All
router.get("/",async(req,res)=>{
    var  GetAllEmployee = await EmployeeRouter.find();
    res.json(GetAllEmployee);
})

 

//Update
router.put("/update", async(req,res) => { 
  console.log(req)
  var filename 
  var files =req.files;
      
      if(!files)
      {
        console.log("if")
        filename = req.body.old_photo;
      }  
      else
      {
        console.log("else")
        const file = req.files.file;
        var datetimestamp = Date.now();
        file.mv(`${__dirname}/../client/public/uploads/Employee/${datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]}`, err => {
            if (err) {
              console.error(err);
              return res.status(500).send(err);
            } 
          })   
          filename = datetimestamp + '.' + file.name.split('.')[file.name.split('.').length -1]
         // filename = file.name
      }
     
    var update =  await  EmployeeRouter.updateMany({_id:req.body._id}, { $set :{       
        photo : filename,
        Employee_code : req.body.Employee_code,
        Employee_name : req.body.Employee_name,
        mobile : req.body.mobile,
        email : req.body.email,
        password : req.body.password,
        dob : req.body.dob,
        department :  req.body.department,
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

router.get("edit/:id", async(req,res)=>{
    var getData  = await EmployeeRouter.findById(req.params.id)      
    res.json(getData);      
 })
 
 //Search Email
 router.get("/SearchEmail/:email", async(req,res)=>{
  var getData  = await EmployeeRouter.find({email:req.params.email });
  res.json(getData);      
})

 //Search code
 router.get("/SearchCode/:Employee_code", async(req,res)=>{
  var getData  = await EmployeeRouter.find({Employee_code:req.params.Employee_code });
  res.json(getData);      
})


module.exports = router;