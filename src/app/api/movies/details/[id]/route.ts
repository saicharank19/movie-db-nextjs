import { NextRequest } from "next/server";
import axios from "axios";
import { authenticateJWT } from "@/helper/common-auth";
import { CrewMember, CastMember } from "@/types/request-body";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const source = await request.headers.get("request");
    if (source == "mobile") {
      await authenticateJWT(request);
    }
    const id = (await params).id;

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=500a2293d6403e9c3caedb4591ae7624`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=500a2293d6403e9c3caedb4591ae7624`;

    const [movieDetailsResponse, creditsResponse] = await Promise.all([
      axios.get(movieDetailsUrl),
      axios.get(creditsUrl),
    ]);

    // Extract relevant data
    const movieDetails = movieDetailsResponse.data;

    // Directors: Filter and map the crew members

    const directors: string[] = creditsResponse.data.crew
      .filter((member: CrewMember) => member.job === "Director") // Filter for directors
      .map((director: CrewMember) => ({
        id: director.id,
        name: director.name,
      })); // Map to director names

    // Cast: Slice the first 10 cast members and map their details
    const cast: { name: string; character: string }[] =
      creditsResponse.data.cast
        .slice(0, 10) // Take the first 10 cast members
        .map((actor: CastMember) => ({
          id: actor.id,
          name: actor.name,
          profile_path: actor.profile_path,
          character: actor.character,
        }));

    return Response.json({
      data: movieDetails,
      cast: cast,
      directors: directors,
      success: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message, success: false });
    }
  }
}
