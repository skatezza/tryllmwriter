// TODOs: remove the menubar, integrate instead inside the sidebar
"use client";

import type { Attachment, Message } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { ChatHeader } from "@/components/chat-header";
import type { Vote } from "@/lib/db/schema";
import { fetcher, generateUUID } from "@/lib/utils";

import { Artifact } from "./artifact";
import { MultimodalInput } from "./multimodal-input";
import { Messages } from "./messages";
import { VisibilityType } from "./visibility-selector";
import { useArtifactSelector } from "@/hooks/use-artifact";
import { toast } from "sonner";
import { AppMenubar } from "./app-menubar";

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedChatModel: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();
  const { data: apiKeyData } = useSWR("/api/keys/get", fetcher);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: {
      id,
      selectedChatModel,
      apiKey: apiKeyData?.apiKey,
    },
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    onFinish: () => {
      mutate("/api/history");
    },
    onError: async (error) => {
      let errorMessage = "An error occurred, please try again!";

      if (error instanceof Error) {
        errorMessage = error.message;

        // Check for API key errors
        if (error.message.includes("API key")) {
          errorMessage = "Please set your OpenAI API key in the settings";
        }
      } else if (error && typeof error === "object") {
        const errorObj = error as { text?: () => Promise<string> };
        try {
          if (errorObj.text) {
            const data = await errorObj.text();
            errorMessage = data;
          }
        } catch {
          // If we can't parse the error response, use the default message
        }
      }

      toast.error(errorMessage);
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex flex-col h-full bg-background">
        {/* <AppMenubar /> */}
        <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Messages
            chatId={id}
            isLoading={isLoading}
            votes={votes}
            messages={messages}
            setMessages={setMessages}
            reload={reload}
            isReadonly={isReadonly}
            isArtifactVisible={isArtifactVisible}
          />

          <div className="relative mx-auto w-full md:max-w-3xl px-4 bg-background mb-4">
            {!isReadonly && (
              <MultimodalInput
                chatId={id}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={stop}
                attachments={attachments}
                setAttachments={setAttachments}
                messages={messages}
                setMessages={setMessages}
                append={append}
              />
            )}
          </div>
        </div>
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
