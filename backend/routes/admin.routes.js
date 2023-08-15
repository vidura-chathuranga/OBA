import express from 'express';
import { adminLogin } from '../controllers/admin.controller.js';

const Router = express.Router();

Router.post('/login',adminLogin);

export default Router;