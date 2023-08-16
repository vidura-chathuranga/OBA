import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import DBCON from './configs/dbConfig.js';
import UserRoutes from "./routes/user.routes.js"
import AdminRoutes from './routes/admin.routes.js';
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 6001;

// initialize the cors
app.use(cors({credentials : true,origin : 'http://localhost:3000'}))

// cookie parser config
app.use(cookieParser());

//initialize the json
app.use(express.json());

// config the urlEncoded middleware
app.use(express.urlencoded({extended : false}));

app.use((req,res,next)=>{
    console.log(`${req.method} =====> URL: ${req.url}`);
    next();
});

app.get('/',(req,res)=>{
    res.send("OBA PROJECT");
});

app.use('/user',UserRoutes);
app.use('/admin',AdminRoutes);

app.listen(PORT,()=>{
    console.log(`🚀 Server is started on port ${PORT}`);
    DBCON();
});

