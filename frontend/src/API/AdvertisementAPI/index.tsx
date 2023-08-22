import axios from "axios";

// create axios instance with base URL and sending cookies automatically in each request
const newAxios = axios.create({
    baseURL : "http://localhost:3001",
    withCredentials : true
});

class AdAPI {
    
    static createAdvertisement = (ad: any,position : string) =>{
        return newAxios.post("/advertisement/create",{image : ad,adPosition : position});
    }

    static getFrontLeftAd = () =>{
        return newAxios.get('/advertisement/frontLeft');
    }

    static getSilverAd = () => {
        console.log("API add")
        return newAxios.get('/advertisement/silverAd');
    }
}

export default AdAPI;