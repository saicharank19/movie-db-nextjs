import { z } from "zod";

export const userValidationType = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
  password: z.string().min(8).max(12),
});
export type userInput = z.infer<typeof userValidationType>;

export interface Genres {
  id: string;
  name: string;
}

export interface Movie {
  title: string;
  original_title: string;
  id: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  tagline: string;
  genres: Genres[];
  runtime: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string; // e.g., "Director", "Producer"
  department: string; // e.g., "Directing", "Production"
}
export interface CastMember {
  id: number;
  name: string;
  character: string; // The character they played in the movie
  profile_path: string | null; // Path to their profile image (optional)
}

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
  popularity: number;
}

export interface CrewMovieCredit {
  id: number;
  title: string;
  job: string;
  department: string;
  release_date: string;
  poster_path: string | null;
}

export interface CastMovieCredit {
  id: number;
  title: string;
  character: string;
  release_date: string;
  poster_path: string | null;
  credit_id: string;
  original_title: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}
