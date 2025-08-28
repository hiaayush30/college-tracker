import jwt from "jsonwebtoken";
import User, { Role } from "../models/user.model.js";
export const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token found" });
        }
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user || user.role !== "admin") {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = {
            _id: user._id,
            email: user.email,
            role: user.role,
            username: user.username
        };
        next();
    }
    catch (error) {
        return res.status(500).json({
            error: "Invalid token"
        });
    }
};
//# sourceMappingURL=admin.middleware.js.map