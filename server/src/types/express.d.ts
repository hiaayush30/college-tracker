import { ObjectId } from "mongoose";
import type { Role } from "../models/user.model.ts";

declare global {
    namespace Express {
        interface UserPayload {
            _id: ObjectId;
            email: string;
            username: string;
            role: Role
        }

        interface Request {
            user?: UserPayload;
        }
    }
}
