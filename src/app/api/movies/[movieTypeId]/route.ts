import { NextRequest } from "next/server";
import axios from "axios";
import { authenticateJWT, getDataFromToken } from "@/helper/common-auth";
import { getSource } from "@/helper/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { movieTypeId: string } }
) {
  try {
    const { id: userId } =
      getSource(request) === "mobile"
        ? ((await authenticateJWT(request)) as { id: string })
        : ((await getDataFromToken(request)) as { id: string });

    const { movieTypeId } = await params; // Destructure params directly
    const API_KEY = process.env.API_KEY;
    // Correct API request URL with the api_key query parameter
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieTypeId}?api_key=${API_KEY}`
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
