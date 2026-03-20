/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export async function GET(
  request: NextRequest,
  { params }: { params: { mediaType: string } },
) {
  const { mediaType } = params;

  try {
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key missing", success: false },
        { status: 500 },
      );
    }

    // Authentication
    let userId: string;
    try {
      const source = getSource(request);

      const authData =
        source === "mobile"
          ? await authenticateJWT(request)
          : await getDataFromToken(request);

      userId = (authData as { id: string }).id;
    } catch {
      return NextResponse.json(
        { error: "Authentication failed", success: false },
        { status: 401 },
      );
    }

    // Example: dynamic API based on mediaType
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${mediaType}?api_key=${API_KEY}`,
    );

    return NextResponse.json({
      mediaType,
      data: result.data,
      success: true,
    });
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.message,
          success: false,
        },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      {
        error: "Something went wrong",
        success: false,
      },
      { status: 500 },
    );
  }
}
