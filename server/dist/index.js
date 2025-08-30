import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import { connectDB } from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import assignmentRouter from "./routes/assignment.route.js";
import { s3Router } from "./routes/s3.route.js";
import { geminiRouter } from "./routes/gemini.route.js";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
dotenv.config();
const app = express();
app.use(cors({
    origin: [process.env.FE_URL],
    credentials: true //allow cookies
}));
app.use(express.json());
app.use(cookieParser());
app.get("/health", (req, res) => {
    res.json({
        message: "server running"
    });
});
app.use("/user", userRouter);
app.use("/assignment", assignmentRouter);
app.use("/s3", s3Router);
app.use("/api/gemini", geminiRouter);
export const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });
let connectedClients = [];
wss.on("connection", (ws) => {
    connectedClients.push({ username: "", socket: ws });
    console.log("New WebSocket client connected");
    connectedClients.forEach(conn => {
        conn.socket.send(JSON.stringify({ type: "meta", message: connectedClients.length }));
    });
    ws.on("message", (msg) => {
        const parsed = JSON.parse(msg.toString());
        console.log(parsed);
        if (parsed.type == "meta") {
            const obj = connectedClients.find(obj => obj.socket == ws);
            if (obj) {
                obj.username = parsed.message;
            }
        }
        else if (parsed.type == "chat") {
            const obj = connectedClients.find(obj => obj.socket == ws);
            if (obj) {
                connectedClients.forEach(conn => {
                    conn.socket.send(JSON.stringify({ type: "chat", message: `${obj.username}:${parsed.message}` }));
                });
            }
        }
    });
    ws.on("close", () => {
        connectedClients = connectedClients.filter(obj => obj.socket != ws);
        connectedClients.forEach(conn => {
            conn.socket.send(JSON.stringify({ type: "meta", message: connectedClients.length }));
        });
        console.log("Client disconnected");
    });
});
connectDB()
    .then(() => {
    server.listen(process.env.PORT, () => {
        console.log("Server running on " + process.env.PORT);
    });
});
//# sourceMappingURL=index.js.map