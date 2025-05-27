import { NextRequest } from "next/server";
import axios from "axios";
import { authenticateJWT } from "@/helper/common-auth";
import { CrewMovieCredit, CastMovieCredit } from "@/types/request-body";

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
    const url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=500a2293d6403e9c3caedb4591ae7624`;

    const response = await axios.get(url);

    const { cast, crew } = response.data;

    // Example: Movies directed
    const directedMovies = crew.filter(
      (item: CrewMovieCredit) => item.job === "Director"
    );

    // Example: Movies acted in
    const actedMovies = cast.map((item: CastMovieCredit) => ({
      id: item.id,
      title: item.title,
      character: item.character,
      poster_path: item.poster_path,
    }));

    return Response.json({
      data: { directedMovies, actedMovies },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
}
