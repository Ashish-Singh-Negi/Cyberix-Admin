import { connectToUserDB } from "@/lib/connectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToUserDB();

  try {
    const { username, email, userId } = await request.json();

    await User.findByIdAndUpdate(userId, {
      username,
      email,
    });

    return NextResponse.json(
      {
        message: "Profile Updated Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
