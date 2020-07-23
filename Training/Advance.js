const express = require("express");
const router = express.Router();
const TrainingAdvanceRouter = require("./AdvanceTable");
const fileUpload = require('express-fileupload'); 
const app = express();
router.use(fileUpload());


//Add
 
router.post("/",(req,res) => { 
        var data= new TrainingAdvanceRouter({             
            traineID : req.body.traineID,
            advanceDate : req.body.advanceDate,
            advanceAmt :  req.body.advanceAmt,
            traineName :  req.body.traineName,         
            course_offered :  req.body.course_offered,
            fees_offered :  req.body.fees_offered        
        }); 
        data.save();
        res.json(data); 
})

router.post("/add",(req,res) => {
     
    const files = req.files.file;
    files.mv(`${__dirname}/../client/public/uploads/Training/${files.name}`, err => {
            if (err) {
            console.error(err);
            return res.status(500).send(err);
            } 
        }) 
        var data= new TrainingAdvanceRouter({ 
            photo : files.name,
            traineID : req.body.traineID,
            advanceDate : req.body.advanceDate,
            advanceAmt :  req.body.advanceAmt,
            traineName :  req.body.traineName,         
            course_offered :  req.body.course_offered,
            fees_offered :  req.body.fees_offered        
        }); 
        data.save();
        res.json(data);
})
//update
router.put("/update", async(req,res) => {  
  console.log(req)
         const files = req.files.file;
         files.mv(`${__dirname}/../client/public/uploads/Training/${files.name}`, err => { 
           if (err) {
               console.error(err);
               return res.status(500).send(err);
           }
        })
        var updates = await TrainingAdvanceRouter.update({traineID: req.body.traineID}, { $set :{
            photo : files.name
        }});
        res.json(updates);
           var update = await TrainingAdvanceRouter.updateMany({ traineID: req.body.traineID }, {
               $push: {
                   payment: {
                        photo: files.name,
                       PaymentID: req.body.PaymentIDs,
                       traineID: req.body.traineID,
                       PaymentDate: req.body.PaymentDate,
                       PaymentAmt: req.body.PaymentAmt
                   }
               }
           });
           res.json(update);
})

router.put("/update1",async(req,res) => {
    console.log(req.body)
    var update = await TrainingAdvanceRouter.updateMany({traineID:req.body.traineID}, { $push :{
        payment: { 
        PaymentID: req.body.PaymentIDs,
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
 //Get All dashboard
router.get("/recentdata",async(req,res)=>{
    var  GetAllData = await TrainingRouter.find().sort({_id:-1}).limit(5);
    res.json(GetAllData);
})

module.exports = router;