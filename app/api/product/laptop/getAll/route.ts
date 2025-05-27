import { connectToProductDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Laptop from "@/models/Laptop";

export async function POST(request: NextRequest) {
  await connectToProductDB();
  try {
    const { email } = await request.json();

    const result = await Laptop.find({ adminID: email });

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
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      {
        status: 400,
      }
    );
  } finally {
    await disconnectToDB();
  }
}
