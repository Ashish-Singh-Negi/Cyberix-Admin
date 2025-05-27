import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { pid, vid, memory, storage } = await request.json();

  if (!pid || !vid || !memory || !storage)
    return NextResponse.json(
      {
        success: false,
        message: `info is required`,
      },
      {
        status: 400,
      }
    );

  await connectToProductDB();

  try {
    const mobile = await Mobile.findById(pid).exec();

    if (!mobile)
      return NextResponse.json(
        {
          success: false,
          message: `Product Not Found`,
        },
        {
          status: 404,
        }
      );

    const index = mobile.varients.findIndex(
      (varient: MobileVarient) => varient._id?.toString() === vid
    );

    if (index < 0)
      return NextResponse.json(
        {
          success: false,
          message: `Variant Not Found`,
        },
        {
          status: 404,
        }
      );

    mobile.varients.splice(index, 1);

    const isMemoryExist = mobile.varients.some(
      (variant: MobileVarient) => variant.memory === memory
    );

    const isStorageExist = mobile.varients.some(
      (variant: MobileVarient) => variant.storage === storage
    );

    if (!isMemoryExist)
      mobile.rams = mobile.rams.filter((ram: string) => ram !== memory);

    if (!isStorageExist)
      mobile.storages = mobile.storages.filter(
        (stor: string) => stor !== storage
      );

    const updatedData = mobile;

    await mobile.save();

    return NextResponse.json(
      {
        success: true,
        message: `Variant deleted successfully`,
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
