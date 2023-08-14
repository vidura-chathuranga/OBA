import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    console.log(req.body);
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
            jobRole: req.body.jobRole,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to register user", error });

    }
};

//get all members
export const getAllMembers = async (req, res) => {

    try {
        const members = await User.find();

        res.status(200).json(User);
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
        jobRole: req.body.jobRole,

    };

    try {
        const updateMember = await User.findByIdAndUpdate(id, updateFields);

        if (!updateMember) {
            // If the member is not found, send a 404 status code with a message
            return res.status(404).json({ message: "Member not found" });
        }
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