import { NextFunction, Response, Request } from "express";
import createHttpError from "http-errors";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password} = req.body;

    // Validation
    if(!name || !email || !password) {
        const eror = createHttpError(400, 'All required fields')

        return next(eror);
    }

    // Process the request

    // Response

  res.json({
    message: "User created successfully",
  });
};

export { createUser };
