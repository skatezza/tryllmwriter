"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { ApiKeyDialog } from "./api-key-dialog";

export function AppMenubar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-200 !z-30">
      <Menubar className="border-none px-2 py-6 bg-background/80 backdrop-blur-sm">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
            >
              New Chat <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Load Chat <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Export Chat <MenubarShortcut>⌘E</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⌘⇧Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Select All <MenubarShortcut>⌘A</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <ApiKeyDialog />
            <MenubarItem>
              Show Sidebar <MenubarShortcut>⌘⇧S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Focus Mode <MenubarShortcut>⌘⇧F</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Zen Mode <MenubarShortcut>⌘⇧Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Normal Mode <MenubarShortcut>⌘⇧N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Font Size</MenubarItem>
            <MenubarItem>Font Family</MenubarItem>
            <MenubarItem>Line Height</MenubarItem>
            <MenubarItem>Letter Spacing</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About</MenubarItem>
            <MenubarItem>Feedback</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Support</MenubarItem>
            <MenubarItem>Donate</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
