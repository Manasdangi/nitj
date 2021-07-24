const http = require("http");
const fs =require("fs");
var requests = require("requests");
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const hostname = '127.0.0.1';
const port = 3000;

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var userid = req.body.userid;
    var phno = req.body.phno;
    var query = req.body.query;
    
    var data = {
        "name": name,
        "userid" : userid,
        "phno": phno,
        "query" : query,
       
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
   return res.redirect('signup_success.html')

})


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});