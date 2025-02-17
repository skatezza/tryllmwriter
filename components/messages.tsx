import { ChatRequestOptions, Message } from "ai";
import { PreviewMessage, ThinkingMessage } from "./message";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { Overview } from "./overview";
import { memo } from "react";
import { Vote } from "@/lib/db/schema";
import equal from "fast-deep-equal";
import { ScrollArea } from "./ui/scroll-area";

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  votes: Array<Vote> | undefined;
  messages: Array<Message>;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[])
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  isReadonly: boolean;
  isArtifactVisible: boolean;
}

function PureMessages({
  chatId,
  isLoading,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <div className="relative flex-1 w-full">
      <div className="absolute inset-0">
        <ScrollArea className="size-full">
          <div
            ref={messagesContainerRef}
            className="flex flex-col min-w-0 px-3 py-6 md:max-w-3xl mx-auto"
          >
            <div className="flex-1" />

            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <PreviewMessage
                  key={message.id}
                  chatId={chatId}
                  message={message}
                  isLoading={isLoading && messages.length - 1 === index}
                  vote={votes?.find((vote) => vote.messageId === message.id)}
                  setMessages={setMessages}
                  reload={reload}
                  isReadonly={isReadonly}
                />
              ))}

              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "user" && (
                  <ThinkingMessage />
                )}
            </div>

            <div
              ref={messagesEndRef}
              className="shrink-0 min-w-[24px] min-h-[24px]"
            />
          </div>
        </ScrollArea>
      </div>

      <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;

  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.isLoading && nextProps.isLoading) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;

  return true;
});
