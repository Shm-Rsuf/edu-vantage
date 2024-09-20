import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { firstName, lastName, email, password, userRole } =
    await request.json();
  await dbConnect;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashPassword,
    role: userRole,
  };
  console.log(newUser);

  try {
    await User.create(newUser);
    return NextResponse.json({
      message: "user has been created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
