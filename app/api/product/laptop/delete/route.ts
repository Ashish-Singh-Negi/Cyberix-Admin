import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Laptop from "@/models/Laptop";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    await connectToProductDB();

    const { _id } = await request.json();

    await Laptop.findByIdAndDelete(_id);

    return NextResponse.json({
      message: "Product Removed Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  } finally {
    await disconnectToDB();
  }
}
