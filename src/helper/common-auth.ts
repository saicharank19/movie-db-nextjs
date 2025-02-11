import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function authenticateJWT(req: Request) {
  return new Promise((resolve, reject) => {
    const token = req.headers.get("authorization")?.split(" ")[1] || "";
    const isUser = jwt.verify(token, process.env.SECRET?.toString() || "");
    console.log(isUser);
    if (isUser) {
      resolve(isUser);
    } else {
      reject("User is not authorized");
    }
  });
}

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET?.toString() || ""
    );
    return decodedToken;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
  }
};
