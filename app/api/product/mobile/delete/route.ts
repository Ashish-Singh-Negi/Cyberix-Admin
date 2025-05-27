import Mobile from "@/models/Mobile";

import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    await connectToProductDB();

    const { _id } = await request.json();

    await Mobile.findByIdAndDelete(_id);

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
    disconnectToDB();
  }
}
