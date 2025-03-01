import User from "@/models/User";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  try {
    const users = await User.find({}, "fullname email dob");
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
};
