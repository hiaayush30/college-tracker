import { Document, Model } from "mongoose";
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
export declare enum Role {
    "user" = 0,
    "admin" = 1
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map