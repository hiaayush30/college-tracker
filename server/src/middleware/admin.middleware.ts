import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JWTPayload } from "../services/user.service.js";
import User, { Role } from "../models/user.model.js";
import type { ObjectId } from "mongoose";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"] as string
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token found" });
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
        const user = await User.findById(decoded._id)
        if (!user || user.role !== "admin") {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = {
            _id:user._id as ObjectId,
            email:user.email,
            role:user.role as unknown as Role,
            username:user.username
        }
        next()
    } catch (error) {
        return res.status(500).json({
            error: "Invalid token"
        })
    }
}