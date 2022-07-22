const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js")

let tasks=[];
let workTasks=[];

const app = express();
app.use(bodyParser.urlencoded(extented=true));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get("/", function(req, res){
  
  res.render("list",{kindOfDay:date.getdate(), newTasks:tasks })
});

app.post("/", function(req, res){
    TASK=req.body.new_item;
    let type=req.body.list;
    console.log(type);

    if (type==="work"){
      workTasks.push(TASK);
      res.redirect("/work");
    }else{
    tasks.push(TASK);
    res.redirect("/");
    }
});

app.get("/work",function(req,res){

  res.render("list",{kindOfDay:"work", newTasks:workTasks });


});




app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
