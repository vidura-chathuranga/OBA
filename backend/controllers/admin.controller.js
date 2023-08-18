import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const admin = await Admin.find({ email: req.body.email });

    if (admin.length > 0) {
      if (bcrypt.compareSync(req.body.password, admin[0].password)) {
        // create access Token
        const accessToken = jwt.sign(
          { _id: admin[0]._id, email: admin[0].email,role : "ADMIN"},
          process.env.SECRET_KEY,
          { expiresIn: 24 * 60 * 60 }
        ); //access Token will expires in 1 day

        // create http only cookie and store access token on it
        res.cookie("access-token-admin", accessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
        });

        // removing the password attribute and send other admin details to the frontend
        const adminDetails = {
          name: admin[0]["name"],
          email: admin[0]["email"],
        };

        // send rest of the admin data to the front end for the future use
        res.status(200).json(adminDetails);
      } else {
        throw new Error("User credentials are wrong");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.cookie("access-token-admin", "", { maxAge: 1 });
  res.status(200).json({});
};
