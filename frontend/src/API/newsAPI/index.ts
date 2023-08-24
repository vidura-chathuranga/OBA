import axios from "axios";

// create axios instance with base URL and sending cookies automatically in each request
const newAxios = axios.create({
    baseURL : "http://localhost:3001",
    withCredentials : true
});

class NewsAPI {
    

    //Add a news 
    static addNews = (ad: any,position : string) =>{
        console.log("News add api")
        return newAxios.post("/news/create",{image : ad,adPosition : position});
    }

    
    static getNews = () => {
        
        return newAxios.get('/news/getnews');
    }
}

export default NewsAPI;