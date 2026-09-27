import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { action, email, password, name, phone } = await request.json();

    if (action === "login") {
      // Allow demo login with any credentials or test account
      const user = {
        id: "usr-" + Date.now(),
        name: email.split("@")[0].toUpperCase() || "RAHUL SHARMA",
        email: email || "user@railmodern.in",
        phone: phone || "9876543210",
        role: email.includes("admin") ? "ADMIN" : "USER",
        token: "jwt_token_" + Math.random().toString(36).substring(2),
      };

      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        user,
      });
    }

    if (action === "register") {
      const user = {
        id: "usr-" + Date.now(),
        name: name || "New Passenger",
        email: email || "newuser@railmodern.in",
        phone: phone || "9876543210",
        role: "USER",
        token: "jwt_token_" + Math.random().toString(36).substring(2),
      };

      return NextResponse.json({
        success: true,
        message: "Account created successfully",
        user,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
