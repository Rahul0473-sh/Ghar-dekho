import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log(userName, email, password);
    
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await prisma.user.create({ 
            data: {
                username:userName, 
                email,
                password: hashedPassword 
            }
        })
        console.log(newUser);
        res.status(201).json({ message: "User Created Successfully" });

    } catch (error) {
        console.log("error in register", error.message);
        throw error;
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid Credenitals in User" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credenitals in password" });
        
        const maxAge = 24*2 * 60 * 60 * 1000;
        const options = {
            httpOnly: true,
            maxAge: maxAge,
            // secure:false,
        }
        const token =  jwt.sign(
            {
                id: user.id,
                isAdmin: true,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: maxAge
            }
        ); 
        const { password: userPassword, ...userInfo } = user; // it's a way to get the values except password

        return res.status(200).cookie("token", token, options).json(userInfo);
        
    } catch (error) {
        console.log(error.message)
        res.status(501).json({ message: "failed to login"});
    }
}
export const logout = async (req, res) => {
    try {
        return res.clearCookie("token").status(200).json({message:"Logout Sucessfull"})
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Something wrong in Logout" });
    }
}