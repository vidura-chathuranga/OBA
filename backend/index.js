import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import DBCON from './configs/dbConfig.js';
import UserRoutes from "./routes/user.routes.js";
import CodeRoutes from './routes/code.routes.js';
import AdminRoutes from './routes/admin.routes.js';
import cookieParser from "cookie-parser";
import AdRoutes from "./routes/advertisement.routes.js";
import NewsRoutes from "./routes/news.routes.js"

const app = express();

const PORT = process.env.PORT || 6001;

// initialize the cors
app.use(cors({credentials : true,origin : 'http://localhost:3000'}))

// cookie parser config
app.use(cookieParser());

//initialize the json
app.use(express.json({limit : '50mb'}));

// config the urlEncoded middleware
app.use(express.urlencoded({extended : false,limit : '50mb'}));

app.use((req,res,next)=>{
    console.log(`${req.method} =====> URL: ${req.url}`);
    next();
});

app.get('/',(req,res)=>{
    res.send("OBA PROJECT");
});

app.use('/user',UserRoutes);
app.use('/admin',AdminRoutes);
app.use('/code',CodeRoutes);
app.use('/advertisement',AdRoutes);
app.use('/news',NewsRoutes);


app.listen(PORT,()=>{
    console.log(`🚀 Server is started on port ${PORT}`);
    DBCON();
});

