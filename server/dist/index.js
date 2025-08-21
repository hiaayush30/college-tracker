import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();
app.get("/health", (req, res) => {
    res.json({
        message: "server running"
    });
});
app.use("/user", userRouter);
app.listen(process.env.PORT, () => {
    console.log("Server running on " + process.env.PORT);
});
//# sourceMappingURL=index.js.map