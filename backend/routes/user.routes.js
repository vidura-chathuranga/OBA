import express from "express";
import { 
    registerUser, 
    getAllMembers, 
    deleteMember, 
    updateMembers, 
    sendPromoCode, 
    getRequestedMembers,
    acceptMember,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(`/register`, registerUser);
router.get("/", getAllMembers);
router.delete("/delete/:id", deleteMember);
router.put("/update/:id", updateMembers);
router.post("/details/:id", sendPromoCode);
router.get("/requested", getRequestedMembers);
router.put("/accept/:id",acceptMember);


export default router;