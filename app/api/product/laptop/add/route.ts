import { connectToProductDB } from "@/lib/connectToDB";
import Laptop from "@/models/Laptop";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToProductDB();
  try {
    const {
      email,
      category,
      brandName,
      productName,
      defaultImgs,
      display,
      rams,
      storages,
      processors,
      gpus,
      laptopVarients,
      color,
      highlights,
    } = await request.json();

    await Laptop.create({
      adminID: email,
      category,
      brandName,
      productName,
      rams,
      storages,
      display,
      color,
      processors,
      gpus,
      varients: laptopVarients,
      highlights,
      defaultImgs,
      rating: 0,
      reviews: [],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product added Successfully in Cyberix",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
