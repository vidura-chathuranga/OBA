import axios from "axios";
const BASE_URL = "http://localhost:3001";

class contactAPI {
    static contactUs (values:{email: string , name : string , message : string}){
        console.log(values);
        return axios.post(`${BASE_URL}/client/contactus`,values);
    }
}

export default contactAPI;

