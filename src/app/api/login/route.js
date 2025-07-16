import { NextResponse } from "next/server";
import axios from "axios";
import { serialize } from "cookie";

export async function POST(request) {
  try {
    const body = await request.json();

    // Forward login credentials to your backend
    const backendRes = await axios.post(
      "https://stepify-backend.onrender.com/api/login",
      body
    );

    // Get token from backend response (adjust if your backend returns it differently)
    const token = backendRes.data.token;
    const user = backendRes.data.user;

    // Set cookie for frontend domain
    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const response = NextResponse.json({ success: true, token, user });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
