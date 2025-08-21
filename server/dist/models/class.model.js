import mongoose, { Schema, Document, Model } from "mongoose";
const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject"
        }]
}, {
    timestamps: true, // createdAt, updatedAt
});
const Class = mongoose.model("Class", ClassSchema);
export default Class;
//# sourceMappingURL=class.model.js.map