"use server";

import { auth } from "@/app/(auth)/auth";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { encryptApiKey } from "@/lib/utils";

export async function saveApiKey(apiKey: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const supabase = createClient(cookies());

  // Encrypt the API key before saving
  const encryptedApiKey = encryptApiKey(apiKey);

  const { error } = await supabase
    .from("User")
    .update({ openai_api_key: encryptedApiKey })
    .eq("id", session.user.id);

  if (error) {
    console.error("Error saving API key:", error);
    throw new Error("Failed to save API key");
  }
}
