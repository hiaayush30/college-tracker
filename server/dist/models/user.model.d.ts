import { Document, Model } from "mongoose";
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
declare const User: Model<IUser>;
export default User;
//# sourceMappingURL=user.model.d.ts.map