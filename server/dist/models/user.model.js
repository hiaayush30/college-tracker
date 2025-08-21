import mongoose, { Schema, Document, Model } from "mongoose";
export var Role;
(function (Role) {
    Role[Role["user"] = 0] = "user";
    Role[Role["admin"] = 1] = "admin";
})(Role || (Role = {}));
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
        enum: Role,
        default: "user"
    }
}, {
    timestamps: true, // createdAt, updatedAt
});
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.model.js.map