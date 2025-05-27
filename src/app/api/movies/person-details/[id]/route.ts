import { NextRequest } from "next/server";
import axios from "axios";
import { authenticateJWT } from "@/helper/common-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const source = await request.headers.get("request");
    if (source == "mobile") {
      await authenticateJWT(request);
    }
    const personId = (await params).id;
    const url = `https://api.themoviedb.org/3/person/${personId}?api_key=500a2293d6403e9c3caedb4591ae7624`;

    const response = await axios.get(url);

    const person = response.data;

    return Response.json({
      data: person,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
}
