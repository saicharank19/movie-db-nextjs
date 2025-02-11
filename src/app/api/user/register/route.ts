import { userModel } from "@/models/user.model";
import bcrypt from "bcrypt";
import { userValidationType } from "@/types/request-body";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbconnect/dbconnect";

connectToDB();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedInput = await userValidationType.safeParse(body);
    if (!parsedInput.success) {
      console.log(parsedInput.error);
      return Response.json({ message: "invalid input" });
    }
    const isUserExists = await userModel.findOne({
      email: parsedInput.data?.email,
    });
    if (isUserExists) {
      return Response.json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(parsedInput.data.password, 10);
    const newUser = await userModel.create({
      email: parsedInput.data.email,
      password: hashedPassword,
    });
    (await newUser).save();
    return Response.json({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, success: false });
    }
  }
}
