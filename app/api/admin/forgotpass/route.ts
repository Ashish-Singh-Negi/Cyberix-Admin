import User from "@/models/User";

import { connectToUserDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import { sendMail } from "@/lib/mailer";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToUserDB();

  try {
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "User not exist",
        success: false,
      });
    }

    let verificationCode = "";

    for (let i = 0; i < 6; i++) {
      verificationCode += Math.round(Math.random() * 9);
    }

    await sendMail({
      email,
      emailType: "RESET",
      userId: user._id,
      code: Number(verificationCode),
    });

    return NextResponse.json(
      {
        message: "Verification Code Send",
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
  } finally {
    disconnectToDB();
  }
}
