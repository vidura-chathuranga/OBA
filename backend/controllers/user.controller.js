import User from "../models/user.model.js";

export const registerUser = async(req,res) =>{
    console.log(req.body);
    try{
        const existingUser = await User.findOne({email:req.body.email});

        if(existingUser){
            console.log("User exist");
            return res.status(409).json({ message : "User already exists "});
        }

        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            year : req.body.year,
            country : req.body.country,
            mobile : req.body.mobile,
            jobRole : req.body.jobRole,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
        
    } catch(error){
        console.log(error);
        res.status(500).json({ message : "Failed to register user", error});

    }
};

//get all members
export const getAllMembers = async (req,res)=>{

    try{
        const members = await User.find();

        res.status(200).json(User);
    }catch(err){
        res.status(500).json({ message: "Failed to fetch Members", err });

    }
}