var express = require('express');
var router = express.Router();
var fs =require("fs");


 
router.get('/', function(req, res) {
  const filesdup =[];
  fs.readdir("./uploads",{withFileTypes:true}, function(err,files){
    files.forEach(function(dirent){
      filesdup.push({name:dirent.name, folderHai:dirent.isDirectory()})
    })
    console.log(filesdup);

    res.render('index',{filesdup});
  })
});

router.get('/createfile', function(req, res ) {
  fs.writeFile(`./uploads/${req.query.filename}`,"", function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
   
});
router.get('/createfolder', function(req, res ) {
  fs.mkdir(`./uploads/${req.query.foldername}`, function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
   
});

router.get('/filename/:filename',function(req, res) {
fs.readFile(`./uploads/${req.params.filename}`, function(err,data){
  console.log(data);
})
});


router.get('/fileopened/:filename',function(req,res){
  const filesdup =[];
  fs.readdir("./uploads",{withFileTypes:true}, function(err,files){
    files.forEach(function(dirent){
      filesdup.push({name:dirent.name, folderHai:dirent.isDirectory()})
    })
    console.log(filesdup);

    
    fs.readFile(`./uploads/${req.params.filename}`,"utf8",function(err,data){
      res.render("fileopened",{files:filesdup,filename:req.params.filename,data:data})
    })
    console.log(req.params.filename)
  })
  
});

router.get('/delete', function(req, res ) {
  fs.unlink(`./uploads/${req.params.filename}`,"", function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
   
});


module.exports = router;
