import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Laptop from "@/models/Laptop";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectToProductDB();

  try {
    const { pid } = await request.json();

    const data = await Laptop.findById(pid);
    return NextResponse.json(
      {
        message: "Product Found",
        success: true,
        data: data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  } finally {
    await disconnectToDB();
  }
}
