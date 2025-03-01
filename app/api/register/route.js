import User from "@/models/User.js";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fullname, email, password, confirmPassword,dob } = await request.json();

  if (password !== confirmPassword) {
    return new NextResponse(
      JSON.stringify({ error: "Passwords do not match" }),
      {
        status: 400,
      }
    );
  }

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ fullname, email, password: hashedPassword,dob });

  try {
    await newUser.save();
    return new NextResponse("User is registered", { status: 201 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

