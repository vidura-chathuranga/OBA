import axios from "axios";

const BASE_URL = "http://localhost:3001";

class UserAPI{

  
    //registration
    static userRegister(values :{name: string,email: string, year:string , country : string , mobile:string ,company:string, jobRole : string}){
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
        company: string;
        jobRole: string;
    }) =>{
        console.log(values);
        return axios.put(`${BASE_URL}/user/update/${values._id}`,values);
    }

    //delete member
    static deleteMember = (values:{
        _id: string;
    }) => {
        return axios.delete(`${BASE_URL}/user/delete/${values._id}`);
      };

      
    //Add promoation code 
    static promotionCode(values :{shopname: string,discount: string}){
        console.log(values);
        return axios.post(`${BASE_URL}/admin/PromationCode`,values);
    }

      //get all promotion code
      static getAllCodes = () =>{
        return axios.get(`${BASE_URL}/code`);
    }

    //delete Promo code
    static deleteCode = (values:{
        shopname: string;
    }) => {
        return axios.delete(`${BASE_URL}/admin/code/delete/${values.shopname}`);
      };

      //update user
    static updateCode = (values:{
       
        shopname: string;
        discount : string;
       
    }) =>{
        console.log(values);
        return axios.put(`${BASE_URL}/admin/code/update/${values.shopname}`,values);
    }


};

export default UserAPI;