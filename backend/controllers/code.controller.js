import PromoCode from "../models/promotion.model.js";

export const addCode = async (req,res) =>{
    console.log("code Controller")
    try{
        const newCode = new PromoCode({
            shopname : req.body.shopname,
            discount : req.body.discount,
        });

        //save new code detials in the database
        const saveCode = await newCode.save();

        res.status(201).json(saveCode); // send the saved code details as the response
    } catch(error){
        res.status(500).json({message : "Failed to add Code",error});
    }
};

export const getAllPromoCode = async (req,res) => {
    try{
        const codes = await PromoCode.find();

        res.status(200).json(codes); 


    }catch(error){
        res.status(500).json({ message : "Failed to fetch codes", error});

    }
};

export const deleteCode = async(req,res) => {
    const shopname = req.body.shopname; //get the shop name

    try{
        const deletedCode = await PromoCode.findByIdAndDelete(shopname);
        if(!deleteCode){
        //if promo code is not found, send a 404 status code with a message
        return res.status(404).json({message:"Shop not found"});
        }
        res.status(200).json({ message: "Promotion Code deleted successfully" });

    }catch(error){
        res.status(500).json({ message: "Failed to delete code", error });

    }
}

export const updateCode = async(req,res) =>{
    const updateFields = {
        shopname : req.body.shopname,
        discount : req.body.discount,

    };

    try{
        const updatedCode = await PromoCode.findByIdAndUpdate(
            shopname,
            updateFields,
            {new:true}
        );

        if(!updatedCode){
            //If code is not found , send 404 status code with a message
            return res.status(404).json({message:"Code not found"});
        }
        res.status(200).json(updateCode); // Send the updated code as the response

    }catch(error){
        res.status(500).json({ message: "Failed to update code", error });

    }
};



