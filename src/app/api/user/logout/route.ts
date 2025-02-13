/* eslint-disable @typescript-eslint/no-unused-expressions */
import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    getSource(request) === "mobile"
      ? ((await authenticateJWT(request)) as { id: string })
      : ((await getDataFromToken(request)) as { id: string });
    const response = NextResponse.json({
      message: "logged out successfully",
      success: true,
    });
    response.cookies.delete("token");
    response.cookies.delete("user_id");
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message, success: false });
    }
  }
}
