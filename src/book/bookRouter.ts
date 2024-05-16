import express from "express";
import { createBook } from "./bookController";
import multer from "multer";
import path from "node:path";

const userRouter = express.Router();

// File Store

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: {fileSize: 3e7}
})

// routes
userRouter.post("/",upload.fields([
    {name:'coverImage', maxCount: 1},
    {name:'file', maxCount: 1},
]), createBook);



export default userRouter;


