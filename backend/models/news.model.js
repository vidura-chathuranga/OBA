import mongoose from "mongoose";


const newsSchema = new mongoose.Schema({
    image : String,
    place : {
        type : String,
        required : true
    }
});

const News = mongoose.model("News",newsSchema);

export default News;