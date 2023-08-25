import User from "../models/user.model.js";
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
            company:req.body.company,
            jobRole: req.body.jobRole,
        });

        const name = req.body.name;
        const email = req.body.email;
        // console.log(name);
        // console.log(email);


        
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        sendPromoCodeMail( name,email);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to register user", error });

    }
};

//get all members
export const getAllMembers = async (req, res) => {

    try {
        const members = await User.find();

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
        company : req.body.company,
        jobRole: req.body.jobRole,

    };
    try {
        const updateMember = await User.findByIdAndUpdate(id, updateFields,{ new: true });

        console.log(updateMember)

        res.status(200).json(updateMember); // Send the updated member as the response


    } catch (err) {

        res.status(500).json({ message: "Failed to update member details", err });

    };
};

export const deleteMember = async (req, res) => {
    const _id = req.params.id; //get the object id of the deleted member

    try {
        const deleteMember = await User.findByIdAndDelete(_id);

        res.status(200).json({ message: "Member deleted",deleteMember})

    } catch (err) {
        res.status(500).json({ message: "Failed to delete member",err });
    }

}