"use server";
import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import Users from "../../../../Models/Users";

export const POST = async (req) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await Users.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User has already registered with this email." },
        { status: 401 }
      );
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with the hashed password
      const newUser = new Users({ email, password: hashedPassword });
      await newUser.save();

      // Generate a JWT token
      // const token = jwt.encode(
      //   { email: newUser.email, id: newUser._id },
      //   secretKey
      // );
      return NextResponse.json({
        message: "User created and logged in",
        data: newUser,
        token,
      });
    }
  } catch (err) {
    console.error("Error signing up:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
