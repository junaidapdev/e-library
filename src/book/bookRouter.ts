import express from "express";
import { createBook, ListBooks, updateBook, getSingleBook, deleteBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import authenticate from "../middlewares/authenticate";

const bookRouter = express.Router();

// File Store

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: {fileSize: 3e7}
})

// routes
bookRouter.post("/", authenticate ,upload.fields([
    {name:'coverImage', maxCount: 1},
    {name:'file', maxCount: 1},
]), createBook);


bookRouter.put("/:bookId", authenticate ,upload.fields([
    {name:'coverImage', maxCount: 1},
    {name:'file', maxCount: 1},
]), updateBook);

bookRouter.get('/', ListBooks)

bookRouter.get('/:bookId', getSingleBook)

bookRouter.delete('/:bookId',authenticate, deleteBook)




export default bookRouter;


