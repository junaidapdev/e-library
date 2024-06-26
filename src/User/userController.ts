import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import userModel from "./userModel";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // Database call.
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const error = createHttpError(
        400,
        "User already exists with this email."
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  /// password -> hash

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;

  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }

  try {
    // Token generation JWT
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    // Response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing JWT Token"));
  }
};

const loginUser =async (req: Request, res: Response, next: NextFunction) => {

  const { email, password } = req.body;

  
  // Validation
  // if (!email || !password) {
  //     const error = createHttpError(400, "All fields are required");
  //     return next(error);
  //   }
    
  
  if (!email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }


  let user;

  try {
    user = await userModel.findOne({ email });

    if (!user) {
      return next(createHttpError(404, 'User does not exist'));
    }
  
  } catch (error) {
    return next(createHttpError(400, 'Error while finding the user.'))
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(createHttpError(401, 'Username or Password is incorrect!'));
  }

//  Access token

try {
  const token = sign({ sub: user._id }, config.jwtSecret as string, {
    expiresIn: "7d",
    algorithm: "HS256",
  });


  res.status(201).json({ accessToken: token });
} catch (error) {
  return next(createHttpError(500, "Error while loging in JWT token"))
}

}

export { createUser, loginUser };
