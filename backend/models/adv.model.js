import mongoose from "mongoose";


const advertisementSchema = new mongoose.Schema({
    image : String,
    place : {
        type : String,
        required : true
    }
});

const Advertisement = mongoose.model("advertisements",advertisementSchema);

export default Advertisement;