"use client";

import { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MenubarItem } from "./ui/menubar";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.error || "An error occurred");
    error.name = res.status.toString();
    throw error;
  }
  return data;
};

export function ApiKeyDialog() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch API key status
  const {
    data: keyStatus,
    error: keyStatusError,
    mutate,
  } = useSWR("/api/keys", fetcher, {
    onError: (err) => {
      // Only log the error if it's not an authentication error
      if (err.name !== "401") {
        console.error("Error fetching API key status:", err);
      }
      // Don't show any toast errors - we'll handle the UI feedback differently
    },
  });

  // Fetch the actual API key when dialog opens
  useEffect(() => {
    if (isOpen) {
      const fetchApiKey = async () => {
        try {
          const response = await fetch("/api/keys/get");
          const data = await response.json();
          if (response.ok && data.apiKey) {
            setApiKey(data.apiKey);
          } else if (!response.ok) {
            console.error("Error fetching API key:", data.error);
          }
        } catch (error) {
          console.error("Error fetching API key:", error);
        }
      };
      fetchApiKey();
    }
  }, [isOpen]);

  const handleSaveApiKey = async () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }

    if (!apiKey.startsWith("sk-")) {
      toast.error("Invalid API key format. Key should start with 'sk-'");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save API key");
      }

      // Reset form and close dialog
      setIsOpen(false);
      await mutate(); // Refresh API key status
      toast.success("API key saved successfully");
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save API key"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setApiKey(""); // Reset form when closing
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <MenubarItem
          onSelect={(event) => {
            event.preventDefault();
            // Only show the "no API key" message if we've successfully fetched the status
            // and we know there's no API key
            if (keyStatus && !keyStatus.hasApiKey && !keyStatusError) {
              toast.error(
                "No API key set. Please configure your OpenAI API key."
              );
            }
            setIsOpen(true);
          }}
        >
          Enter API Key <KeyRound className="ml-auto h-4 w-4" />
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your OpenAI API Key</DialogTitle>
          <DialogDescription>
            Your API key will be securely stored and used for all AI
            interactions.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && apiKey && !isLoading) {
                  handleSaveApiKey();
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              You can find your API key in your{" "}
              <a
                href="https://platform.openai.com/account/api-keys"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                OpenAI dashboard
              </a>
              .
            </p>
          </div>
          <Button
            onClick={handleSaveApiKey}
            disabled={!apiKey || isLoading}
            className="w-full"
          >
            {isLoading ? "Saving..." : "Save API Key"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
