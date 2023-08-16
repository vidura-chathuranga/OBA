import axios from "axios";

const BASE_URL = "http://localhost:3001";

class AdminAPI {
    static loginAdmin = (values: { email: string; password: string }) =>{
        return axios.post(`${BASE_URL}/admin/login`,values);
    }

    static logout(){
        return axios.get(`${BASE_URL}/admin/logout`,{withCredentials:true});
    }
}

export default AdminAPI;