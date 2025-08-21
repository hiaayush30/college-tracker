import mongoose, { Schema, Document, Model } from "mongoose";
const SubjectSchema = new Schema({
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
    classworks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Classwork"
        }]
}, {
    timestamps: true, // createdAt, updatedAt
});
const Subject = mongoose.model("Subject", SubjectSchema);
export default Subject;
//# sourceMappingURL=subject.model.js.map