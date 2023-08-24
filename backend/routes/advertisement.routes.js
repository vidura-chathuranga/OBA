import express from "express";
import { validateAdmin } from "../middlewares/Auth.middleware.js";
import {
  getFrontLeftAds,
  postAdvertisement,
  getSiverAds,
} from "../controllers/advertisement.controller.js";



const Router = express.Router();

Router.post("/create", validateAdmin, postAdvertisement);
Router.get("/frontLeft", getFrontLeftAds);
Router.get("/silverAd",getSiverAds);


export default Router;
