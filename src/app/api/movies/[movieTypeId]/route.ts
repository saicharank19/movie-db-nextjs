/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ movieTypeId: string }> }
) {
  try {
    // Await the params object before destructuring
    const { params } = context;
    const awaitedParams = await params; // Await the params object
    const { movieTypeId } = awaitedParams;

    // Validate API key
    const API_KEY = await process.env.API_KEY;

    // Authentication with better error handling
    let userId: string;
    try {
      const source = getSource(request);
      const authData =
        source === "mobile"
          ? await authenticateJWT(request)
          : await getDataFromToken(request);

      userId = (authData as { id: string }).id;
      console.log(userId);
    } catch (authError) {
      return new Response(
        JSON.stringify({
          error: "Authentication failed",
          success: false,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    console.log(API_KEY);
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    return NextResponse.json({ movieTypeId, data: result.data, success: true });
  } catch (error) {
    // Enhanced error handling with specific error types
    console.log(error);
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        return new Response(
          JSON.stringify({
            error: "Request timeout",
            success: false,
          }),
          {
            status: 504,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;
      return new Response(
        JSON.stringify({
          error: message,
          success: false,
        }),
        {
          status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generic error handler
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
