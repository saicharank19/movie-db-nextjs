/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ movieTypeId: string }> }
) {
  try {
    // Await the params object before destructuring
    const { params } = context;
    const awaitedParams = await params; // Await the params object
    const { movieTypeId } = awaitedParams;

    // Validate movieTypeId parameter
    if (!movieTypeId || typeof movieTypeId !== "string") {
      return new Response(
        JSON.stringify({
          error: "Invalid movieTypeId parameter",
          success: false,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate API key
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
      throw new Error("API_KEY environment variable is not configured");
    }

    // Authentication with better error handling
    let userId: string;
    try {
      const source = getSource(request);
      const authData =
        source === "mobile"
          ? await authenticateJWT(request)
          : await getDataFromToken(request);

      userId = (authData as { id: string }).id;
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

    // Make API request with timeout and proper error handling
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieTypeId}`,
      {
        params: { api_key: API_KEY },
        timeout: 5000, // 5 second timeout
        validateStatus: (status) => status === 200, // Only accept 200 status
      }
    );

    return NextResponse.json({ movieTypeId, data: result.data, success: true });
  } catch (error) {
    // Enhanced error handling with specific error types
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
