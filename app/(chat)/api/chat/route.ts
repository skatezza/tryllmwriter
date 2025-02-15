import {
  type Message,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from "ai";

import { auth } from "@/app/(auth)/auth";
import { myProvider } from "@/lib/ai/models";
import { systemPrompt } from "@/lib/ai/prompts";
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from "@/lib/db/queries";
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
  decryptApiKey,
} from "@/lib/utils";

import { generateTitleFromUserMessage } from "../../actions";
import { createDocument } from "@/lib/ai/tools/create-document";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 60;

export async function POST(request: Request) {
  console.log("🚀 Starting chat POST request...");

  const {
    id,
    messages,
    selectedChatModel,
    apiKey: providedApiKey,
  }: {
    id: string;
    messages: Array<Message>;
    selectedChatModel: string;
    apiKey?: string;
  } = await request.json();

  console.log("📝 Selected chat model:", selectedChatModel);

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    console.log("❌ No session or user found");
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("✅ User authenticated:", session.user.id);

  // Use provided API key or fall back to environment variable
  const apiKey = providedApiKey || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log("❌ No API key found");
    return new Response("Please set your OpenAI API key in the settings", {
      status: 400,
    });
  }

  // Decrypt the API key if it's from the database (providedApiKey)
  const decryptedKey = providedApiKey ? decryptApiKey(apiKey) : apiKey;

  if (typeof decryptedKey !== "string" || !decryptedKey.startsWith("sk-")) {
    console.log("❌ Invalid API key format");
    return new Response("Invalid OpenAI API key format", {
      status: 400,
    });
  }

  const trimmedKey = decryptedKey.trim();
  console.log("✅ API key validated:", {
    keyLength: trimmedKey.length,
    startsWithSk: trimmedKey.startsWith("sk-"),
    firstFiveChars: trimmedKey.substring(0, 5) + "...",
  });

  // Create OpenAI instance with the provided API key
  const openai = createOpenAI({
    apiKey: trimmedKey,
  });

  const userMessage = getMostRecentUserMessage(messages);

  if (!userMessage) {
    console.log("❌ No user message found");
    return new Response("No user message found", { status: 400 });
  }

  const chat = await getChatById({ id });

  if (!chat) {
    console.log("🔄 Generating title for new chat...");
    const title = await generateTitleFromUserMessage({
      message: userMessage,
      apiKey: trimmedKey,
    });

    console.log("✅ Title generated successfully:", title);
    await saveChat({ id, userId: session.user.id, title });
    console.log("✅ New chat created with title");
  }

  await saveMessages({
    messages: [{ ...userMessage, createdAt: new Date(), chatId: id }],
  });

  console.log("🚀 Starting stream response...");
  return createDataStreamResponse({
    execute: (dataStream) => {
      console.log("📡 Executing stream with model:", selectedChatModel);
      const result = streamText({
        model: openai(
          selectedChatModel === "chat-model-large" ? "gpt-4" : "gpt-3.5-turbo"
        ),
        system: systemPrompt({ selectedChatModel }),
        messages,
        maxSteps: 5,
        experimental_activeTools:
          selectedChatModel === "chat-model-reasoning"
            ? []
            : [
                "getWeather",
                "createDocument",
                "updateDocument",
                "requestSuggestions",
              ],
        experimental_transform: smoothStream({ chunking: "word" }),
        experimental_generateMessageId: generateUUID,
        tools: {
          getWeather,
          createDocument: createDocument({
            session,
            dataStream,
            apiKey: trimmedKey,
          }),
          updateDocument: updateDocument({
            session,
            dataStream,
            apiKey: trimmedKey,
          }),
          requestSuggestions: requestSuggestions({
            session,
            dataStream,
            apiKey: trimmedKey,
          }),
        },
        onFinish: async ({ response, reasoning }) => {
          if (session.user?.id) {
            try {
              const sanitizedResponseMessages = sanitizeResponseMessages({
                messages: response.messages,
                reasoning,
              });

              await saveMessages({
                messages: sanitizedResponseMessages.map((message) => {
                  return {
                    id: message.id,
                    chatId: id,
                    role: message.role,
                    content: message.content,
                    createdAt: new Date(),
                  };
                }),
              });
            } catch (error) {
              console.error("Failed to save chat");
            }
          }
        },
        experimental_telemetry: {
          isEnabled: true,
          functionId: "stream-text",
        },
      });

      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true,
      });
    },
    onError: (error) => {
      console.error("Error in chat:", error);
      return error instanceof Error
        ? error.message
        : "An error occurred while processing your request";
    },
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
