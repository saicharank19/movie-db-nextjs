import { z } from "zod";

export const userValidationType = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
  password: z.string().min(8).max(12),
});
export type userInput = z.infer<typeof userValidationType>;

export interface Movie {
  original_title: string;
  id: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
}
