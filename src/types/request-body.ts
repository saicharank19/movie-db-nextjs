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
