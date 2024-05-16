import { NextFunction, raw, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import bookModel from "./bookModel";
import fs from "node:fs";
import createHttpError from "http-errors";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

  // Log uploaded files
  console.log("files", req.files);

  // Extract uploaded files

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Get MIME type of the cover image file
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

  // Extract filename and construct file path for the cover image
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads/",
    fileName
  );

  try {
    // Upload cover image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_Override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    // Extract filename and construct file path for the book PDF file
    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads/",
      bookFileName
    );

    // Upload book PDF file to Cloudinary
    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_Override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    console.log("bookFileUploadResult", bookFileUploadResult);

    const newBook = await bookModel.create({
      title,
      genre,
      author: "6645a50c146ff3bb215511eb",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    // Delete uploaded files
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res.status(201).json({id: newBook._id})
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error while uploading book"));
  }

  
};

export { createBook };
