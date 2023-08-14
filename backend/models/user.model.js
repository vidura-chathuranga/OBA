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

    jobRole:{
        type:String,
    }
},{timestamps : true});

const User = mongoose.model("users",userSchema);

export default User;






