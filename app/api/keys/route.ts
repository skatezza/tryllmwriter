import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { auth } from "@/app/(auth)/auth";
import { encryptApiKey } from "@/lib/utils";

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

    return new NextResponse(
      JSON.stringify({ hasApiKey: Boolean(data?.openai_api_key) }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in /api/keys:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process your request" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ error: "Please log in to continue" }),
        { status: 401 }
      );
    }

    const { apiKey } = await req.json();

    if (!apiKey) {
      return new NextResponse(
        JSON.stringify({ error: "API key is required" }),
        { status: 400 }
      );
    }

    if (!apiKey.startsWith("sk-")) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid API key format" }),
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Encrypt the API key before saving
    console.log("🔐 Encrypting API key before saving to database...");
    const encryptedKey = encryptApiKey(apiKey);

    // Update the user's API key in the User table
    const { error } = await supabase
      .from("User")
      .update({ openai_api_key: encryptedKey })
      .eq("id", session.user.id);

    if (error) {
      console.error("Error saving API key:", error);
      return new NextResponse(
        JSON.stringify({ error: "Could not save API key to database" }),
        { status: 500 }
      );
    }

    console.log("✅ API key saved successfully");
    return new NextResponse(
      JSON.stringify({ message: "API key saved successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/keys:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process your request" }),
      { status: 500 }
    );
  }
}
