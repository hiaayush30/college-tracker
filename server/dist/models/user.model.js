import mongoose, { Schema, Document, Model } from "mongoose";
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    }
}, {
    timestamps: true, // createdAt, updatedAt
});
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map