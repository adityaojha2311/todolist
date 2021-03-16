//jshint esversion:6
//by default all the static things such as styles.css , plain js doesnot gets recognised by express , so in order to do so a folder named public is created to get the job done.
const express = require ('express');
const app = express(); // initialise express
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for the working of body parser this is required.
app.use(express.static('public')); // this code is added to use the static things (css, plain js etc)
app.set('view engine', 'ejs'); // for using ejs


let items=[  'Buy Food',
  'Cook Food',
  'Eat Food'];
  let workItems = [];
app.get("/",function(req,res){

 let day = date.getDate();

res.render("list",{listTitle:day,newListItems: items});
});

app.get("/work",function(req,res)
{
  res.render("list",{listTitle:"WORK LIST",newListItems: workItems});
});

app.post("/",function(req,res)
 {
     let item = req.body.newItem;
       if(req.body.list == 'WORK'){
          workItems.push(item);
          res.redirect("/work");
        }
          else{
 items.push(item);

res.redirect("/");} /// goes to the app.get function(or) and compiles the  code.
});
//iitially when you add something in the newly created worklist , then when pressing the button it will generate a request to the *root* directory and not the *root/work* directory


app.listen( 3000 ,function(){

  console.log("Server  is running on port 3000");

})


// NOTES
// 1. WE CAN USE EJS FOR SHORTENING THE CODE.
//        FOR EXAMPLE - WE HAVE TO CREATE MULTIPLE PAGES AND EACH PAGE REQUIRES SAME HEADER AND FOOTER FILES, SO WE CAN
//        CREATE THE HEADER.EJS AND FOOTER.EJS FILES AND INCORPORATE IT IN THE REST OF EJS FILES
// <%-include("header")-%>

//2. get to learn about module exports.
