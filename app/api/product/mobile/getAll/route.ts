import Mobile from "@/models/Mobile";
import { connectToProductDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

export async function POST(request: NextRequest) {
  await connectToProductDB();
  try {
    const { email } = await request.json();

    const result = await Mobile.find({ adminID: email });

    return NextResponse.json(
      {
        success: true,
        message: "Product Found",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Oops! No Product Found",
    });
  } finally {
    await disconnectToDB();
  }
}
