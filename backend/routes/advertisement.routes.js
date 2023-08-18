import express from "express";
import { validateAdmin } from "../middlewares/Auth.middleware.js";
import {
  getFrontLeftAds,
  postAdvertisement,
} from "../controllers/advertisement.controller.js";

const Router = express.Router();

Router.post("/create", validateAdmin, postAdvertisement);
Router.get("/frontLeft", getFrontLeftAds);

export default Router;
