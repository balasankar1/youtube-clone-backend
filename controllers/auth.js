import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};
export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return res.json({ msg: "wrong credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user });
  } catch (err) {
    next(err);
  }
};
