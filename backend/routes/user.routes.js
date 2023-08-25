import express from "express";
import { registerUser, getAllMembers, deleteMember, updateMembers,sendPromoCode } from "../controllers/user.controller.js";

const router = express.Router();

router.post(`/register`, registerUser);
router.get("/", getAllMembers);
router.delete("/delete/:id", deleteMember);
router.put("/update/:id", updateMembers);
router.post("/details",sendPromoCode)


export default router;