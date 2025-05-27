import { connectToUserDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToUserDB();
  try {
    const { email, otp } = await request.json();

    const user = await User.findOne({ email });

    if (Number(user.forgotPasswordToken) !== Number(otp)) {
      return NextResponse.json({
        message: "Invalid OTP",
        success: false,
      });
    }

    return NextResponse.json({
      message: "OTP Verified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  } finally {
    disconnectToDB();
  }
}
