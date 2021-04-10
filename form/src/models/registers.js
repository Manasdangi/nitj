const mongoose =require("mongoose");
const employeeSchema = new mongoose.Schema({
    
    fname:{
        type:String,
        required:true,
    },
  
    femail:{
        type:String,
        required:true,
    
    },
    fphone:{
        type:Number,
        required:true,
    },

    fpass:{
        type:String,
        required:true,
    },
    fcpass:{
        type:String,
        required:true,
    }
})
const Register =new mongoose.model("Register",employeeSchema);

module.exports=Register;