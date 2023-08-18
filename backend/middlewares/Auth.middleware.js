import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const validateAdmin = (req,res,next) =>{
    const accessToken = req.cookies['access-token-admin'];

    if(accessToken){
        jwt.verify(accessToken,process.env.SECRET_KEY,(err,decode)=>{
            if(err){
                res.status(403).json({error:"Token was changed by someone"});
            }else{
                if(decode.role === "ADMIN"){
                    next();
                }else{
                    res.status(403).json({error:"Unkown user"});
                }
            }
        })
    }
}