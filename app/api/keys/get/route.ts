import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { auth } from "@/app/(auth)/auth";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ error: "Please log in to continue" }),
        { status: 401 }
      );
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Get the user's API key from the User table
    const { data, error } = await supabase
      .from("User")
      .select("openai_api_key")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching API key:", error);
      return new NextResponse(
        JSON.stringify({ error: "Could not fetch API key from database" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check for API key in environment variables first, then fall back to database
    const apiKey = process.env.OPENAI_API_KEY || data?.openai_api_key;

    return new NextResponse(JSON.stringify({ apiKey }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/keys/get:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process your request" }),
      { status: 500 }
    );
  }
}
