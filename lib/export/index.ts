import type { Chat } from "@/lib/db/schema";
import { jsPDF } from "jspdf";

export interface MessagePart {
  type: string;
  text: string;
}

export interface Message {
  role: string;
  content: string | MessagePart[] | { content: string; [key: string]: any };
}

export interface ChatWithMessages extends Chat {
  messages: Message[];
}

export const exportAsText = async (chat: ChatWithMessages) => {
  const content = formatChatContent(chat);
  downloadFile(content, `${chat.title}.txt`, "text/plain");
};

export const exportAsMarkdown = async (chat: ChatWithMessages) => {
  const content = formatChatContentMarkdown(chat);
  downloadFile(content, `${chat.title}.md`, "text/markdown");
};

export const exportAsJSON = async (chat: ChatWithMessages) => {
  const content = JSON.stringify(chat, null, 2);
  downloadFile(content, `${chat.title}.json`, "application/json");
};

export const exportAsPDF = async (chat: ChatWithMessages) => {
  const doc = new jsPDF();

  // Set margins and usable page width
  const margin = 15;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const usableWidth = pageWidth - 2 * margin;

  // Set font size and line height
  doc.setFontSize(11);
  const lineHeight = doc.getTextDimensions("test").h * 1.5;

  let y = margin;

  // Add title
  doc.setFont("helvetica", "bold");
  doc.text(chat.title, margin, y);
  y += lineHeight * 2;

  // Add date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Created on ${new Date(chat.createdAt).toLocaleString()}`,
    margin,
    y
  );
  y += lineHeight * 2;

  // Reset font size for content
  doc.setFontSize(11);

  // Process each message
  chat.messages.forEach((message) => {
    // Add role label in bold
    doc.setFont("helvetica", "bold");
    doc.text(`${message.role}:`, margin, y);
    y += lineHeight;

    // Switch to normal font for content
    doc.setFont("helvetica", "normal");

    // Get and split message content
    const messageContent = getMessageContent(message);
    const contentLines = doc.splitTextToSize(messageContent, usableWidth);

    // Add content lines
    contentLines.forEach((line: string) => {
      // Check for page break
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.text(line, margin, y);
      y += lineHeight;
    });

    // Add spacing after each message
    y += lineHeight;

    // Check for page break after spacing
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  });

  doc.save(`${chat.title}.pdf`);
};

const getMessageContent = (message: Message): string => {
  if (typeof message.content === "string") {
    return message.content;
  }
  if (Array.isArray(message.content)) {
    return message.content
      .map((part) => part.text || "")
      .join("\n")
      .trim();
  }
  if (typeof message.content === "object" && message.content !== null) {
    if ("content" in message.content) {
      return message.content.content;
    }
    // Try to parse as MessagePart array if it's a stringified JSON
    try {
      const parsed = JSON.parse(JSON.stringify(message.content));
      if (Array.isArray(parsed)) {
        return parsed
          .map((part) => part.text || "")
          .join("\n")
          .trim();
      }
    } catch (e) {
      // If parsing fails, return the stringified content
      return JSON.stringify(message.content);
    }
  }
  return String(message.content);
};

const formatChatContent = (chat: ChatWithMessages): string => {
  let content = `Title: ${chat.title}\n`;
  content += `Date: ${new Date(chat.createdAt).toLocaleString()}\n\n`;

  chat.messages.forEach((message) => {
    const messageContent = getMessageContent(message);
    content += `${message.role}: ${messageContent}\n\n`;
  });

  return content;
};

const formatChatContentMarkdown = (chat: ChatWithMessages): string => {
  let content = `# ${chat.title}\n\n`;
  content += `*Created on ${new Date(chat.createdAt).toLocaleString()}*\n\n`;

  chat.messages.forEach((message) => {
    const messageContent = getMessageContent(message);
    content += `### ${message.role}\n${messageContent}\n\n`;
  });

  return content;
};

const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
