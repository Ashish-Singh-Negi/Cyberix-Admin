import User from "@/models/User";
import { connectToUserDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  await connectToUserDB();

  try {
    const { email, newPassword } = await request.json();

    const password = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      {
        password: password,
      }
    );

    return NextResponse.json(
      {
        message: "password changed",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
