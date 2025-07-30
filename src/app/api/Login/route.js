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
    const { email, password } = await req.json(); // Extract email and password from request body
    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.encode({ email: user.email, id: user._id }, secretKey);
    return NextResponse.json({
      email: user.email,
      password: user.password,
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
