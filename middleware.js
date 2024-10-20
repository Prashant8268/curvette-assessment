import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  const token = req.cookies.get("curvette");
  const url = req.nextUrl.clone();


  try {
    // Verify token if it exists
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch (error) {
    // Handle invalid token: delete it and proceed with redirection
    req.cookies.delete("token");
  }

  // Protect the /home and /verify routes
  if (url.pathname === "/home" || url.pathname === "/verify") {
    if (!token) {
      console.log("User is not authenticated, redirecting to /");
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/verify"], 
};
