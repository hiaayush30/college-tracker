import type { Request, Response } from "express";
import { Role } from "../models/user.model.js";
import { type ObjectId } from "mongoose";
export interface JWTPayload {
    _id: ObjectId;
    username: string;
    email: string;
    role: Role;
}
export declare const registerUser: (req: Request, res: Response) => Promise<any>;
export declare const login: (req: Request, res: Response) => Promise<any>;
export declare const logout: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=user.service.d.ts.map