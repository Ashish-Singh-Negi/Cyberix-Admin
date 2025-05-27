import { connectToProductDB } from "@/lib/connectToDB";
import { disconnectToDB } from "@/lib/disconnectToDB";
import Mobile from "@/models/Mobile";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = await request.nextUrl;

  const pid = searchParams.get("pid");

  console.log(pid);

  if (!pid)
    return NextResponse.json(
      {
        success: false,
        message: `PID is required`,
      },
      {
        status: 400,
      }
    );

  await connectToProductDB();

  try {
    const data = await Mobile.findById(pid).lean().exec();

    console.log(data);

    return NextResponse.json(
      {
        success: true,
        message: "Product Found",
        data: data,
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
