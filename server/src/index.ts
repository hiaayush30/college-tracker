import express from "express";
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js";
import { connectDB } from "./utils/db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import assignmentRouter from "./routes/assignment.route.js";

dotenv.config()

const app = express();
app.use(cors({
    origin: process.env.FE_URL,
    credentials:true //allow cookies
}))
app.use(express.json())
app.use(cookieParser())

app.get("/health", (req, res) => {
    res.json({
        message: "server running"
    })
})

app.use("/user", userRouter)
app.use("/class", assignmentRouter)

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server running on " + process.env.PORT)
        })
    })
