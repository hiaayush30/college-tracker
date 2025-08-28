import type { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../schema/user.schema.js";
import User, { Role } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import jwt from "jsonwebtoken";
import { type ObjectId } from "mongoose";

export interface JWTPayload {
    _id: ObjectId,
    username: string,
    email: string,
    role: Role
}


export const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsed = RegisterSchema.safeParse(req.body);
        if (!parsed.success) {
            console.log(parsed.error.format())
            return res.status(403).json({
                error: "Invalid request"
            })
        }
        const { email, password, username } = parsed.data;
        const existing = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if (existing) {
            return res.status(403).json({
                error: "User already exists"
            })
        }
        const hashedPassword = await hashPassword(password)
        await User.create({
            email,
            username,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "User created successfully!"
        })

    } catch (error) {
        console.log("error in signup:", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const parsed = LoginSchema.safeParse(req.body);
        if (!parsed.success) {
            console.log(parsed.error.format())
            return res.status(403).json({
                error: "Invalid request"
            })
        }
        const { password, username } = parsed.data;
        const existing = await User.findOne({
            username
        })
        if (!existing) {
            return res.status(403).json({
                error: "User not found!"
            })
        }
        const isValid = await comparePassword(password, existing.password)
        if (!isValid) {
            return res.status(403).json({
                error: "invalid credentials"
            })
        }
        const token = jwt.sign({
            _id: existing._id,
            username: existing.username,
            email: existing.email,
            role: existing.role
        }, process.env.JWT_SECRET!, {
            expiresIn: "1d"
        })
        res.cookie("token",token, {
            httpOnly: true,  // cannot be accessed by JS 
            secure: true, // must be true in production
            sameSite: "none",   // requires secure:true if none or browser wil block it when in prod
            maxAge: 1000 * 60 * 60 * 24, // 1 day,
            // domain: process.env.FE_URL!
        })

        return res.status(200).json({
            message: "User logged in successfully!"
        })

    } catch (error) {
        console.log("error in login:", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }
}


export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 600 * 60 * 24,
        path: "/"
    });

    res.json({ message: "Signed out successfully" });
};
