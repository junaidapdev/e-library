import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password} = req.body;

    // Validation
    if(!name || !email || !password) {
        const eror = createHttpError(400, 'All required fields')

        return next(eror);
    }

    // Database call
    const user = await userModel.findOne({email})

    if (user) {
        const error = createHttpError(400, 'User already exists with the same email');

        return next(error);
    }

    // Process the request

    // Response

  res.json({
    message: "User created successfully",
  });
};

export { createUser };
