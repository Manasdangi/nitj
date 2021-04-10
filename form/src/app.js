const express = require("express");
const path=require("path");
const app =express();

const hbs=require("hbs");


require("./db/conn");
const Register=require("./models/registers");


const port=process.env.PORT || 2000; 

const static_path=path.join(__dirname,"../public"); 
const template_path=path.join(__dirname,"../templates/views"); 
const partials_path=path.join(__dirname,"../templates/partials"); 

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path)) ;
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
    })
 
app.post("/register",async(req,res)=>{
     try{
        const password=req.body.fpass;
        const cpassword=req.body.fcpass;
if(password===cpassword){
const registerEmployee=new Register({
    fname:req.body.fname,
    femail:req.body.femail,
    fphone:req.body.fphone,
    fpass:password,
    fcpass:cpassword,
  /*  console.log(req.body.fname);
    res.send(req.body.fname);*/
     })
     
     const registered=await registerEmployee.save();
     req.session.user_id = registerEmployee.id;
     res.status(201).render("index");
    }
    else{
        res.send("password not matching");
    }
}
     catch(error){
         res.status(400).send(error);
     }
        }
        )
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})

