import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//Register Routes
export const registerController = async (req, res) => {
  try {
    const { name, lname, email, password, cpassword } = req.body;
    console.log(req.body);
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!lname) {
      return res.send({ message: "Last name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!cpassword) {
      return res.send({ message: "Confirm Password is Required" });
    }
    if (cpassword != password) {
      return res.send({ message: "Please Enter the currect password" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: false,
        message: "Already register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      lname,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration ",
      error,
    });
  }
};

//POST Routes
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// get all user api
export const getAllUsers = async (req, res) => {
  try {
    // Fetch all user details from the database
    const users = await userModel.find({}, { password: 0 }); // Exclude password field from the response
    res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error in retrieving user details:", error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving user details",
      error: error.message,
    });
  }
};
