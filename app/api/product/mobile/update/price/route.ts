import { NextRequest, NextResponse } from "next/server";

import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";

import Mobile from "@/models/Mobile";

export async function PUT(req: NextRequest) {
  const { pid, newSalePrice, newMRP, newInStock, vid, color } =
    await req.json();

  console.log(pid, newSalePrice, newMRP, newInStock, vid, color);

  if (!pid || !newSalePrice || !newMRP || !newInStock || !vid)
    return NextResponse.json(
      {
        success: false,
        message: "data is required to update",
      },
      {
        status: 400,
      }
    );

  await connectToProductDB();

  try {
    const mobile = await Mobile.findById(pid).exec();

    console.log(mobile);

    const variantToUpdate: MobileVarient = mobile.varients.find(
      (variant: MobileVarient) => variant._id?.toString() === vid
    );

    console.log(variantToUpdate);

    variantToUpdate.salePrice = newSalePrice;
    variantToUpdate.mrp = newMRP;
    variantToUpdate.inStock.map((stock) => {
      if (stock.color === color) {
        stock.stock = newInStock;
      }
    });

    const updatedData = mobile;

    await mobile.save();

    return NextResponse.json(
      {
        success: true,
        message: "Price & Stock Updated",
        data: updatedData,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  } finally {
    await disconnectToDB();
  }
}
