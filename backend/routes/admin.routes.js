import express from 'express';
import { adminLogin, logout } from '../controllers/admin.controller.js';

const Router = express.Router();

Router.post('/login',adminLogin);
Router.get('/logout',logout);

export default Router;