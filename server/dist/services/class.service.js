import Class from "../models/class.model.js";
import { addClassSchema, updateClassSchema } from "../schema/class.schema.js";
export const addClass = async (req, res) => {
    try {
        const parsed = addClassSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.flatten() });
        }
        const { name } = parsed.data;
        const newClass = await Class.create({
            name,
            createdBy: req.user?._id,
        });
        res.status(201).json(newClass);
    }
    catch (err) {
        console.error("Error adding class:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const updateClass = async (req, res) => {
    try {
        const bodyCheck = updateClassSchema.safeParse(req.body);
        if (!bodyCheck.success) {
            return res.status(400).json({ error: bodyCheck.error.flatten() });
        }
        const updated = await Class.findByIdAndUpdate({ $set: bodyCheck.data }, { new: true });
        if (!updated) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(200).json(updated);
    }
    catch (err) {
        console.error("Error updating class:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const deleteClass = async (req, res) => {
    try {
        const { classId } = req.body;
        if (!classId) {
            return res.status(403).json({
                error: "Class id required"
            });
        }
        const deleted = await Class.findByIdAndDelete({ _id: classId });
        if (!deleted) {
            return res.status(404).json({ error: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting class:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//# sourceMappingURL=class.service.js.map