import User from "../models/user.model.js";
import PromoCode from "../models/promotion.model.js";

import { sendPromoCodeMail } from "../Mails/user.mails.js";


export const registerUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            console.log("User exist");
            return res.status(409).json({ message: "User already exists " });
        }

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            year: req.body.year,
            country: req.body.country,
            mobile: req.body.mobile,
            company: req.body.company,
            jobRole: req.body.jobRole,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to register user", error });

    }
};

//get all members
export const getAllMembers = async (req, res) => {

    try {
        const members = await User.find({status: "ACCEPTED"});

        res.status(200).json(members);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch Members", err });

    };
};

//update existing members
export const updateMembers = async (req, res) => {

    const id = req.params.id;

    const updateFields = {
        name: req.body.name,
        email: req.body.email,
        year: req.body.year,
        country: req.body.country,
        mobile: req.body.mobile,
        company: req.body.company,
        jobRole: req.body.jobRole,

    };
    try {
        const updateMember = await User.findByIdAndUpdate(id, updateFields, { new: true });

        res.status(200).json(updateMember); // Send the updated member as the response


    } catch (err) {

        res.status(500).json({ message: "Failed to update member details", err });

    };
};

export const deleteMember = async (req, res) => {
    const _id = req.params.id; //get the object id of the deleted member

    try {
        const deleteMember = await User.findByIdAndDelete(_id);

        res.status(200).json({ message: "Member deleted", deleteMember })

    } catch (err) {
        res.status(500).json({ message: "Failed to delete member", err });
    }

};


//send and decrese promotion code count function 
export const sendPromoCode = async (req, res) => {

    const id = req.params.id; 
    const userName = req.body.name;
    const userEmail = req.body.email;
    try {

        // Fetch promotion code details from the database
        const promotionCode = await PromoCode.findById(id);

        if (!promotionCode) {
            return res.status(404).json({ message: "Promotion code not found" });
        }

        // Decrement the count by 1
        promotionCode.count = Math.max(0, promotionCode.count - 1);

        // Save the updated promotion code count details
        await promotionCode.save();

        sendPromoCodeMail(userName, userEmail);

    } catch (err) {

        res.status(500).json({ message: "Failed Send Email", err });

    }
};

//get requstedMembers 
export const getRequestedMembers = async (req,res) =>{

    try{
      const requestedMembers = await User.find({status : "REQUESTED"});
  
      // sends requested stocks to the frontend
      res.status(200).json(requestedMembers);
    }catch(error){
      res.status(500).json({error:error,message:"Error while getting requested Members"})
    }
  };

  export const acceptMember = async(req,res) =>{
    const id = req.params.id; 

    console.log(id)
    try{
  
    //updated stock status 
    const acceptedMember = await User.findByIdAndUpdate(id,{status:"ACCEPTED"});
  
    //send the success status
    res.status(200).json(acceptedMember);
  
  }catch(error){
    res.status(500).json({error:error,message:"Error while Accepting the Member status"});
  }
  
  }