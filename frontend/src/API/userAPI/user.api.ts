import axios from "axios";

const BASE_URL = "http://localhost:3001";

class UserAPI{

  
    //registration
    static userRegister(values :{name: string,email: string, year:string , country : string , mobile:string , jobRole : string}){
        console.log(values);
        return axios.post(`${BASE_URL}/user/register`,values);
    }


    //get all registered users
    static getAllMembers = () =>{

        return axios.get(`${BASE_URL}/user`);
    }


    //update user
    static updateMember = (values:{
        _id: string;
        name: string;
        email: string;
        year: Date;
        country: string;
        mobile: string;
        jobRole: string;
    }) =>{

        return axios.put(`${BASE_URL}/user/update`,values);

    }

    //delete member
    static deleteMember = (values:{
        _id: string;
    }) => {
        return axios.delete(`${BASE_URL}/user/delete/${values}`);
      };
};

export default UserAPI;