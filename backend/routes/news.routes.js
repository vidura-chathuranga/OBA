import express from "express";
import { validateAdmin } from "../middlewares/Auth.middleware.js";
import { getNews,postNews } from "../controllers/news.controller.js";


const Router = express.Router();


Router.post("/create",validateAdmin,postNews);
Router.get("/getNews",getNews);

export default Router;
