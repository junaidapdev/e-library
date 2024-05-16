import express from "express";
import { createBook, updateBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";

const userRouter = express.Router();

// File Store

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: {fileSize: 3e7}
})

// routes
userRouter.post("/", authenticate ,upload.fields([
    {name:'coverImage', maxCount: 1},
    {name:'file', maxCount: 1},
]), createBook);


userRouter.put("/:bookId", authenticate ,upload.fields([
    {name:'coverImage', maxCount: 1},
    {name:'file', maxCount: 1},
]), updateBook);


export default userRouter;


