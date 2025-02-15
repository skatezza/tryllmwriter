"use server";

import { generateText, Message } from "ai";
import { cookies } from "next/headers";
import { createOpenAI } from "@ai-sdk/openai";

import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from "@/lib/db/queries";
import { VisibilityType } from "@/components/visibility-selector";
import { myProvider } from "@/lib/ai/models";
import { decryptApiKey } from "@/lib/utils";

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set("chat-model", model);
}

export async function generateTitleFromUserMessage({
  message,
  apiKey,
}: {
  message: Message;
  apiKey: string;
}) {
  // Decrypt the API key if it's from the database
  const decryptedKey = apiKey.startsWith("sk-")
    ? apiKey
    : decryptApiKey(apiKey);

  console.log("🔑 API key validation:", {
    hasApiKey: Boolean(decryptedKey),
    keyLength: decryptedKey?.length,
    isString: typeof decryptedKey === "string",
    startsWithSk: decryptedKey?.startsWith("sk-"),
    apiKeyValue: decryptedKey?.substring(0, 5) + "...", // Log first 5 chars for debugging
  });

  if (
    !decryptedKey ||
    typeof decryptedKey !== "string" ||
    !decryptedKey.startsWith("sk-")
  ) {
    throw new Error("Invalid OpenAI API key format");
  }

  const trimmedKey = decryptedKey.trim();

  try {
    const openai = createOpenAI({
      apiKey: trimmedKey,
    });

    const { text: title } = await generateText({
      model: openai("gpt-3.5-turbo"),
      system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
      prompt: JSON.stringify(message),
    });

    console.log("📝 Generated title:", title);
    return title;
  } catch (error) {
    console.error("Error generating title:", error);
    throw error;
  }
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
