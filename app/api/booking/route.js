import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Server-side validation
    const { firstName, lastName, date, time, service } = data;
    if (!firstName || !lastName || !date || !time || !service) {
      return NextResponse.json(
        { error: "Kindly fill in all required booking details." },
        { status: 400 }
      );
    }

    // LOGIC: Integration with Resend (Email) or a Booking System (Calendly/Custom DB)
    console.log("New Atelier Booking:", data);

    // Luxury delay for processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      success: "Consultation request sent. Our atelier manager will confirm your slot via email." 
    });
  } catch (error) {
    return NextResponse.json(
      { error: "The booking system is currently under maintenance. Please call us directly." },
      { status: 500 }
    );
  }
}