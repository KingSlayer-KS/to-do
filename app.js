
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose")
const _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Sirjan:Sirjan@demo.eekxi.mongodb.net/todolistDB")
//Schema
const idemsSchema={
        name:String
}
const customListScheam={
          name:String,
          items:[idemsSchema]
}
//model name
const Item=mongoose.model("Item", idemsSchema)

const list= mongoose.model("list",customListScheam)

const i1=new Item({
      name:"buy Grocery"
});

const i2=new Item({
      name:"do Home work"
});

const i3=new Item({
      name:"do chopping"
});

const defaultItems=[i1,i2,i3];










app.get("/", function(req, res) {

  Item.find({},function(err,result){

    if (result.length == 0){
      Item.insertMany(defaultItems,function(err){
        if(err){
        console.log(err)
      }else{
        console.log("Successful")
      }})
      res.render("list", {listTitle: "today", newListItems: result});
    }else{
      res.render("list", {listTitle: "today", newListItems: result});
    }


  })



});

app.post("/", function(req, res){
  const listedItem = req.body.newItem;
  const i4=new Item({
    name:listedItem
  });


  if(req.body.list=="today"){
    i4.save();
    res.redirect("/")
  }
  else{
    list.findOne({name: req.body.list},function(err,result){
        result.items.push(i4)
        result.save()
        res.redirect("/"+req.body.list)
    })
  }

});


app.post("/del",function(req,res){
  const delItem = req.body.p;
  const nameList=req.body.listname;
  if(nameList=="today"){
    Item.findByIdAndDelete(delItem,function(err){
      if(err){
        console.log(err)
      }else{
        console.log("del success")
      }
    })
    res.redirect("/")
  }
  else{
    list.findOneAndUpdate({name:nameList},{$pull:{items:{_id:delItem}}},function(err,result){
      if(!err){
        res.redirect("/"+nameList)
      }else{
        console.log(err)
      }
    })
  }
})





app.get("/:custom", function(req,res){
  const customName=_.capitalize(req.params.custom);
  list.findOne({name:customName},function(err,result){
    if(!err){
      if (result) {
        res.render("list", {listTitle: result.name, newListItems: result.items});
      } else {
        const liste= new list({
          name:customName,
          items:defaultItems
        });    
        liste.save();
        res.redirect("/"+customName);
      }
  }
    else{
      console.log(err)
    }
  })
}
)


app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


