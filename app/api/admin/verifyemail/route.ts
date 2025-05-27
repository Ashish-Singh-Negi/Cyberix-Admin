import User from "@/models/User";

import { connectToUserDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

export async function POST(request: NextRequest) {
  await connectToUserDB();

  try {
    const { token } = await request.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Token",
        },
        {
          status: 400,
        }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 400,
      }
    );
  } finally {
    disconnectToDB();
  }
}
