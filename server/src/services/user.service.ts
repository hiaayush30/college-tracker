import type { Request, Response } from "express";
import { UserSchema } from "../schema/user.schema.js";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/bcrypt.js";

export const registerUser = async (req:Request,res:Response):Promise<any>=>{
    try {
        const parsed = UserSchema.safeParse(req.body);
        if(!parsed.success){
            console.log(parsed.error.format())
            return res.status(403).json({
                error:"Invalid request"
            })
        }
        const {email,password,username} = parsed.data;
        const existing = await User.findOne({
            email
        })
        if(existing){
            return res.status(403).json({
                error:"User already exists"
            })
        }
        const hashedPassword = await hashPassword(password)
        await User.create({
            email,
            username,
            password:hashedPassword
        })
        return res.status(201).json({
            message:"User created successfully!"
        })

    } catch (error) {
        console.log("error in signup:",error)
        return res.status(500).json({
            error:"Internal server error"
        })
    }
}