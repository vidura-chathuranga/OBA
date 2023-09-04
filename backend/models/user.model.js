import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type : String,
        required : true,
    },

    email:{
        type:String,
        required :true,
        unique : true,
    },

    year:{
        type: String,
        required :true,
        
    },

    country:{
        type : String,
        
    },

    mobile:{
        type: String,
    },

    company:{
        type : String,
    },

    jobRole:{
        type:String,
    },
    status : {
        type : String,
        default : "REQUESTED"
    },
},{timestamps : true});

const User = mongoose.model("users",userSchema);

export default User;






