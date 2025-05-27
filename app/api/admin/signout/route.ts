import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        message: "Signout Successfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.delete("token");

    return response;
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
  }
}
