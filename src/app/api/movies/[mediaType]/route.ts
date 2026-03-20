/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ mediaType: string }> },
) {
  try {
    const { mediaType } = await context.params; // ✅ FIX

    const API_KEY = process.env.API_KEY;

    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${mediaType}?api_key=${API_KEY}`,
    );

    return NextResponse.json({
      mediaType,
      data: result.data,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
        success: false,
      },
      { status: 500 },
    );
  }
}
