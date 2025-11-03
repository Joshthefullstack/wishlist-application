import { Request, Response, NextFunction } from "express";

import { getUserByEmail, createUser } from "../services/users.js";
import { random, authentication } from "../utils/generate.js";
import { BadRequestError, ConflictError } from "../middlewares/errorhandler.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new ConflictError("Email is already in use");
    }

    const salt = random();
    // const hashedPassword = authentication(salt, password);

    const user = await createUser({
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return res
      //   .status(400)
      //   .json({ message: "Email and password are required" });
      throw new BadRequestError("Email and password are required");
    }

    const user = await getUserByEmail(email).select(
      "+authentication.password +authentication.salt +authentication.sessionToken"
    );

    if (!user || !user.authentication) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const hashedPassword = authentication(user.authentication.salt, password);

    if (hashedPassword !== user.authentication.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("sessionToken", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // stays f 7 days
    });
    return res
      .status(200)
      .json({
        _id: user._id,
        email: user.email,
        sessionToken: user.authentication.sessionToken,
      })
      .end();
  } catch (error) {
    next(error);
  }
};
