import { NextRequest } from "next/server";
import axios from "axios";
import { authenticateJWT } from "@/helper/common-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const source = request.headers.get("request");
    if (source === "mobile") {
      await authenticateJWT(request); // authenticate only if the source is "mobile"
    }

    const { slug } = await params; // Destructure params directly
    const API_KEY = process.env.API_KEY;
    // Correct API request URL with the api_key query parameter
    const result = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${slug}`
    );

    return new Response(JSON.stringify({ data: result.data, success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Proper error handling and return response
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
