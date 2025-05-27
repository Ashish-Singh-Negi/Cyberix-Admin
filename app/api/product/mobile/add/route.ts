import Mobile from "@/models/Mobile";
import { connectToProductDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import { disconnectToDB } from "@/lib/disconnectToDB";

export async function POST(request: NextRequest) {
  await connectToProductDB();

  try {
    const {
      email,
      category,
      brandName,
      productName,
      defaultImgs,
      rams,
      storages,
      mobileVarients,
      color,
      highlights,
    } = await request.json();

    await Mobile.create({
      adminID: email,
      category,
      brandName,
      productName,
      defaultImgs,
      color,
      rams,
      storages,
      highlights,
      varients: mobileVarients,
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
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Oops! product not added in Cyberix DB",
    });
  } finally {
    disconnectToDB();
  }
}
