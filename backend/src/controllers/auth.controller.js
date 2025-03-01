import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ 
            email, 
            fullName, 
            password: hashedPassword 
        });

        if(newUser) {
            // generate token
        }else{
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {

    }

};

export const login = async (req, res) => {
    res.send("login route");
};  

export const logout = async (req, res) => {
    res.send("logout route");
};
