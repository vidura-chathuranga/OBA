import axios from "axios";

const BASE_URL = "http://localhost:3001";

class UserAPI{

  
    static userRegister(values :{name: string,email: string, year:string , country : string , mobile:string , jobRole : string}){
     
        return axios.post(`${BASE_URL}/user/register`,values,{withCredentials:true});
    }


};

export default UserAPI;