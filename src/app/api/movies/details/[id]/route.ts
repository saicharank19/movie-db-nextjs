import { NextResponse } from "next/server";
import axios from "axios";
import { authenticateJWT } from "@/helper/common-auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const source = await request.headers.get("request");
    if (source == "mobile") {
      await authenticateJWT(request);
    }
    const id = params.id;
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=500a2293d6403e9c3caedb4591ae7624`
    );

    return NextResponse.json({ data: result.data, success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, success: false });
    }
  }
}
