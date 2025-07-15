import { NextResponse } from "next/server";
import { serialize } from "cookie";
import axios from "axios";

export async function POST(request) {
  try {
    // Optionally, notify your backend to invalidate the session
    await axios.post(
      "https://stepify-backend.onrender.com/logout",
      {},
      { withCredentials: true }
    );
  } catch (e) {
    // Ignore backend errors for logout
  }

  // Clear the cookie by setting it to expire in the past
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 0,
  });

  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", cookie);
  return response;
}
