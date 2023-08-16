import Admin from "../models/admin.model.js";


export const adminLogin = async(req,res) =>{
    console.log(req.body);

    try{
        
    const admin = await Admin.find({email : req.body.email});

    if(admin.length > 0){
        if(req.body.password === admin[0].password){
            res.status(200).json(admin);
        }else{
            throw new Error("User credentials are wrong")
        }
    }else{
        throw new Error("User not found")
    }
    }catch(err){
        res.status(500).json({error : err.message})
    }
}
