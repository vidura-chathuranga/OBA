import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({

    shopname:{
        type : String,
        required : true,
    },

    discount:{
        type : String,
        required : true,
    }

   
},{timestamps : true});

const PromoCode = mongoose.model("code",codeSchema);

export default PromoCode;






