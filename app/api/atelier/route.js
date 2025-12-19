import { NextResponse } from "next/server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("--- ATELIER DATA RECEIVED ---", body);

    // 1. PRIORITIZE THE ATELIER MEASUREMENTS (Bespoke Modal)
    // We check for 'submission_source' specifically to avoid routing conflicts
    if (body.submission_source === "Bespoke Modal") {
      
      const isBespoke = body.sizing_profile === "Bespoke";

      const measurementFields = {
        "Client": body.client_email, 
        "Sizing Profile": body.sizing_profile,
        "Fabric Type": body.fabric_type || "Casmir",
        "Fabric Color": body.fabric_color || "Royal Blue",
        "Purpose/Occasion": body.occasion || "General",
        
        // Exact column names from your list
        "Top Chest": isBespoke ? (parseFloat(body.top_chest) || 0) : 0,
        "Top Shoulder": isBespoke ? (parseFloat(body.top_shoulder) || 0) : 0,
        "Top Sleeve": isBespoke ? (parseFloat(body.top_sleeve) || 0) : 0,
        "Top Length": isBespoke ? (parseFloat(body.top_length) || 0) : 0,
        "Bottom Waist": isBespoke ? (parseFloat(body.bot_waist) || 0) : 0,
        "Bottom Hips": isBespoke ? (parseFloat(body.bot_hips) || 0) : 0,
        "Bottom Inseam": isBespoke ? (parseFloat(body.bot_inseam) || 0) : 0,
        "Bottom Thigh": isBespoke ? (parseFloat(body.bot_thigh) || 0) : 0,
      };

      const measurementRecord = await base("ATELIER MEASUREMENTS").create([{ fields: measurementFields }]);

      await base("COMMISSIONS").create([{
        fields: {
          "Product Name": body.product_name,
          "Production Status": "Inquiry",
          "Priority": "Normal",
          "Deadline": body.deadline || null,
          "Atelier Measurements": [measurementRecord[0].id], 
          "Temp_Client_Email": body.client_email,
          "Temp_Client_Name": body.client_name,
          "Artisanal Notes": body.notes || ""
        }
      }]);

      return NextResponse.json({ success: "Archive entry secured." });
    }

    // 2. ROUTE TO INBOX (Only for standard contact forms)
    if (body.type || body.service || body.message) {
      const fullName = body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim();
      
      // Verification: Check if your INBOX table uses "Email" or "Client"
      await base("INBOX").create([{
        fields: {
          "Name": fullName,
          "Email": body.email || body.client_email, 
          "Phone": body.phone || "",
          "Inquiry Type": body.type || "General",
          "Additional Notes": body.notes || "",
          "Message": body.message || "",
          "Entry Date": new Date().toISOString().split('T')[0],
          "Handling Status": "Unread"
        }
      }]);
      return NextResponse.json({ success: "Inquiry logged." });
    }

    return NextResponse.json({ error: "Invalid data structure" }, { status: 400 });

  } catch (error) {
    console.error("Atelier Sync Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}