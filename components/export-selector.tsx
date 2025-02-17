import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileIcon,
  FileJsonIcon,
  FileTextIcon,
  FileTypeIcon,
} from "lucide-react";
import { ChevronDownIcon } from "./icons";
import {
  exportAsText,
  exportAsMarkdown,
  exportAsJSON,
  exportAsPDF,
  type ChatWithMessages,
} from "@/lib/export";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ExportSelector({
  chatId,
  className,
}: {
  chatId: string;
} & React.ComponentProps<typeof Button>) {
  const handleExport = async (
    exportFn: (chat: ChatWithMessages) => Promise<void>,
    format: string
  ) => {
    const exportPromise = new Promise<string>(async (resolve, reject) => {
      try {
        const response = await fetch(`/api/chat/${chatId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chat data");
        }
        const chatData = await response.json();
        await exportFn(chatData);
        resolve(`Successfully exported as ${format}`);
      } catch (error) {
        console.error(error);
        reject(new Error(`Failed to export as ${format}`));
      }
    });

    toast.promise(exportPromise, {
      loading: `Exporting as ${format}...`,
      success: (message) => message as string,
      error: (error) => error.message as string,
    });
  };

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn("md:px-2 md:h-[34px]", className)}
            >
              <FileIcon className="h-4 w-4" />
              <span className="inline-flex items-center gap-1">
                Export <ChevronDownIcon />
              </span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Export Chat</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        <DropdownMenuItem onClick={() => handleExport(exportAsText, "TXT")}>
          <FileTextIcon className="h-4 w-4 mr-2" />
          <span>Export as TXT</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport(exportAsMarkdown, "Markdown")}
        >
          <FileTypeIcon className="h-4 w-4 mr-2" />
          <span>Export as Markdown</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport(exportAsJSON, "JSON")}>
          <FileJsonIcon className="h-4 w-4 mr-2" />
          <span>Export as JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport(exportAsPDF, "PDF")}>
          <FileIcon className="h-4 w-4 mr-2" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
