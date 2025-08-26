import { Router } from "express";import { getSignedUploadURL } from "../services/s3.service.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";



export const s3Router = Router();

s3Router.post("/getSignedUrl",adminMiddleware,getSignedUploadURL);