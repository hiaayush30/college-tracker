import mongoose, { Schema, Document, Model } from "mongoose";
const ClassworkSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    classworkURL: {
        type: String,
        required: false
    },
    solutionURL: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true, // createdAt, updatedAt
});
const Classwork = mongoose.model("Classwork", ClassworkSchema);
export default Classwork;
//# sourceMappingURL=classwork.model.js.map