import { NextRequest, NextResponse } from "next/server";

import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";

import Mobile from "@/models/Mobile";

export async function PUT(request: NextRequest) {
  const { pid, newMobileVarient, newHighlights } = await request.json();

  console.log("New Varients are this to updated : ", newMobileVarient);

  if (!newHighlights && !newHighlights)
    return NextResponse.json(
      {
        success: false,
        message: `Data is required to update`,
      },
      {
        status: 400,
      }
    );

  await connectToProductDB();

  try {
    const mobile = await Mobile.findById(pid).exec();

    if (newMobileVarient) {
      for (const variant of newMobileVarient) {
        mobile.varients.push(variant);

        // check if memory exist
        const isMemoryExist = mobile.rams.find(
          (memory: string) => memory === variant.memory
        );

        if (!isMemoryExist) {
          mobile.rams.push(variant.memory);
        }

        // check if storage exist
        const isStorageExist = mobile.storages.find(
          (storage: string) => storage === variant.storage
        );

        if (!isStorageExist) {
          mobile.storages.push(variant.storage);
        }
      }
    }

    if (newHighlights) {
      for (const highlight of newHighlights) {
        mobile.highlights.push(highlight);
      }
    }

    const updatedData = mobile;

    console.log("Mobile", mobile);

    await mobile.save();

    return NextResponse.json(
      {
        success: true,
        message: `Variant Updated`,
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
