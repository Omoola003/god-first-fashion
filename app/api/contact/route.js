import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, type, message } = data;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Kindly complete all fields." },
        { status: 400 }
      );
    }

    // LOGIC: This is where you would call Resend or Nodemailer
    console.log("GodFirst Concierge received:", data);

    // Simulate luxury processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ success: "Our concierge will reach out shortly." });
  } catch (error) {
    return NextResponse.json(
      { error: "The atelier is currently unavailable. Please try later." },
      { status: 500 }
    );
  }
}