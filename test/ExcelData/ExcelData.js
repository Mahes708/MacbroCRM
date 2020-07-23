const express = require("express");
const router = express.Router();
const ExcelDataRouter = require("./ExcelDataTable");
const multer = require("multer");
const fileUpload = require('express-fileupload');
const app = express();

 
 

//Add
// const storage = multer.diskStorage({
    
//     destination: function(req, file, cb){
//         cb(null,"./Public/" );
//      },
//     filename: function(req, file, cb){
//        cb(null,"IMAGE-" + Date.now() + file.originalname);
//     }
//  });
 
//  const upload = multer({
//     storage: storage,
//     limits:{fileSize: 1000000},
//  }).single("myfile");

// router.post("/",async(req,res) => {
//     var data= new ExcelDataRouter({         
       
//         UserName : req.body.UserName,
//         TypeOflead : req.body.TypeOflead,
//         ExcelFileName :  req.body.ExcelFileName,
//         ExcelFileData : req.file.path   
        
//     });
//     await data.save();
//     res.json(data);
// })

app.use(fileUpload());

// Upload Endpoint
app.post('/', async(req, res) => {
   if (req.files === null) {
     return res.status(400).json({ msg: 'No file uploaded' });
   }
   var data= new ExcelDataRouter({
     file : req.files.file  
  });
   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
     if (err) {
       console.error(err);
       return res.status(500).send(err);
     } 
     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
   });
   await data.save();
    res.json(data);
 }); 
module.exports = router;