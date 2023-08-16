import express from 'express';
import { addCode, getAllPromoCode , deleteCode , updateCode } from '../controllers/code.controller.js';

const Router = express.Router();

Router.post("/addpromo",addCode);
Router.get("/",getAllPromoCode);
Router.delete("/",deleteCode);
Router.put("/update",updateCode);




export default Router;