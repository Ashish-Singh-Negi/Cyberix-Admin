import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { connectToUserDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

export async function POST(request: NextRequest) {
  await connectToUserDB();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return NextResponse.json(
        {
          message: "user not exist",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        {
          message: "Invalid Password",
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const tokenData: TokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "SignIn Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        success: false,
      },
      {
        status: 400,
      }
    );
  } finally {
    await disconnectToDB();
  }
}
