import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req) {
  try {
    const { body, isValidSignature } = await parseBody(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const type = body?._type;
    if (!type) {
      return new NextResponse("Bad Request: No type provided", { status: 400 });
    }

    // This kills the cache for anything marked with this tag
    // e.g., if you edit a "product", it clears everything tagged "product"
    revalidateTag(type);
    
    console.log(`Revalidated all content with tag: ${type}`);
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(), 
      tag: type 
    });
  } catch (err) {
    return new NextResponse(err.message, { status: 500 });
  }
}