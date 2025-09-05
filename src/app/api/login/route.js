import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    
    const loginRes = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isEmployee: true }),
      }
    );

    if (!loginRes.ok) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const loginData = await loginRes.json();
    const token = loginData.token;

    
    const userRes = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/user/info",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user info" },
        { status: 401 }
      );
    }

    const userData = await userRes.json();

   
    const response = NextResponse.json({
      id: userData.id,
      name: userData.name,
      email,
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
