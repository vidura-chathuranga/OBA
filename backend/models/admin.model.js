import mongoose from "mongoose";


const adminModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

const Admin = mongoose.model('admins',adminModel);

export default Admin;