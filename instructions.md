<Project_overview>

# Project overview

You are building an LLM frontend/chat UI for a web application. The UI should be clean and modern, akin to iA Writer, and enable users to have a chat with LLMs in a distraction-free, zen-like environment with a focus on the text being written. You will be using bun package manager, Next.js, Shadcn, TypeScript, TailwindCSS, lucide-react, Vercel's @ai-sdk/openai for the LLM integration, and Vercel's AI SDK for the chat interface.

<IMPORTANT>

- The current project is a fork of Vercel's [ai-chatbot template](https://github.com/vercel/ai-chatbot).
- Adding a new shadcn component is done by running `bunx shadcn add <component-name>`

</IMPORTANT>

</Project_overview>

<Core_Functionalities>
<User_Interface>

## User Interface

<Menubar>
- [x] The menubar appears when we hover over the top of the screen
- [x] The menubar contains the following options:
  - [x] File menu
    - [ ] New chat (opens a new chat) - UI only, functionality not implemented
    - [ ] Load chat (opens a modal to load a file) - UI only, functionality not implemented
    - [ ] Export chat (txt, pdf, json, markdown) - UI only, functionality not implemented
  - [x] Edit menu
    - [ ] Undo - UI only, functionality not implemented
    - [ ] Redo - UI only, functionality not implemented
    - [ ] Cut - UI only, functionality not implemented
    - [ ] Copy - UI only, functionality not implemented
    - [ ] Paste - UI only, functionality not implemented
    - [ ] Select all - UI only, functionality not implemented
  - [x] Settings menu
    - [x] Enter API Key - Implemented with a sheet modal and Supabase integration
    - [ ] Focus mode - UI only, functionality not implemented
    - [ ] Zen mode - UI only, functionality not implemented
    - [ ] Normal mode - UI only, functionality not implemented
    - [ ] Font size (tbd) - UI only, functionality not implemented
    - [ ] Font family (tbd) - UI only, functionality not implemented
    - [ ] Line height (tbd) - UI only, functionality not implemented
    - [ ] Letter spacing (tbd) - UI only, functionality not implemented
  - [x] Help menu
    - [ ] About - UI only, functionality not implemented
    - [ ] Feedback - UI only, functionality not implemented
    - [ ] Support - UI only, functionality not implemented
    - [ ] Donate - UI only, functionality not implemented
</Menubar>

<!-- ### Sidebar

- [x] The sidebar appears when we click on the sidebar icon
- [x] The sidebar contains the chat history from latest to oldest interactions
- [x] The sidebar contains a + button to create a new chat (top right) -->

<Chat_interface>

- [x] There's a fade gradient effect on the top and bottom of the chat
- [ ] The chat's text area is displayed with mb-[20vh] margin bottom
      </Chat_interface>

<Chat_messages_area>

- [x] The latest message is displayed at right above the text area and keep piling up
      </Chat_messages_area>

<Chat_textarea>

- [x] The text area's caret is of color caret-sky-500
- [x] The text area's background is bg-transparent
- [x] The text area's border is border-none
- [x] The text area's font size is font-mono

</Chat_textarea>
</Core_Functionalities>

<Implementation_details>

## Implementation Details

1. Menubar Component ⚠️ (Partial)

   - ✅ Added shadcn menubar component
   - ✅ Implemented hover-to-show functionality with opacity transition
   - ✅ Added all menu items with keyboard shortcuts
   - ✅ Added backdrop blur effect
   - ❌ No functionality implemented for menu items
   - ❌ No modals implemented

2. Chat Interface ✅

   - ✅ Added top and bottom gradient effects
   - ✅ Implemented 20vh bottom margin
   - ✅ Added proper spacing and padding
   - ✅ Centered content with responsive max-width

3. Messages Area ✅

   - ✅ Implemented message stacking with consistent gaps
   - ✅ Added responsive padding
   - ✅ Centered content with max-width constraints
   - ✅ Added proper overflow handling

4. Text Area ✅
   - ✅ Added sky-500 caret color
   - ✅ Set transparent background
   - ✅ Removed borders
   - ✅ Added monospace font
   - ✅ Implemented proper padding and spacing

</Implementation_details>

<Required_Next_Steps>

## Required Next Steps

1. Menu Item Functionality:

   - [ ] Implement new chat creation
   - [ ] Add file loading functionality with modal
   - [ ] Add export functionality with format selection
   - [ ] Implement edit operations (undo, redo, cut, copy, paste, select all)
   - [ ] Add appearance mode switching (Focus, Zen, Normal)

2. Required Modals:

   - [ ] Add shadcn dialog component
   - [ ] Create file loading modal
   - [ ] Create about modal
   - [ ] Create feedback form modal

3. Appearance Controls:

   - [ ] Add font size controls
   - [ ] Add font family selection
   - [ ] Add line height controls
   - [ ] Add letter spacing controls

4. Help Menu Actions:
   - [ ] Implement about modal with app information
   - [ ] Add feedback form functionality
   - [ ] Add support page redirection
   - [ ] Add donation page redirection

</Required_Next_Steps>

<Documentation>

<Vercel_AI_SDK>

## Vercel AI SDK

- [Vercel AI SDK](https://sdk.vercel.ai/docs)

</Vercel_AI_SDK>

<Shadcn>

## Shadcn

- [Shadcn](https://ui.shadcn.com/)

</Shadcn>

</Documentation>

<File_structure>

# Current file structure

.
├── LICENSE
├── README.md
├── app
│   ├── (auth)
│   │   ├── actions.ts
│   │   ├── api
│   │   │   └── auth
│   │   │   └── [...nextauth]
│   │   │   └── route.ts
│   │   ├── auth.config.ts
│   │   ├── auth.ts
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │   └── page.tsx
│   ├── (chat)
│   │   ├── actions.ts
│   │   ├── api
│   │   │   ├── chat
│   │   │   │   └── route.ts
│   │   │   ├── document
│   │   │   │   └── route.ts
│   │   │   ├── files
│   │   │   │   └── upload
│   │   │   │   └── route.ts
│   │   │   ├── history
│   │   │   │   └── route.ts
│   │   │   ├── suggestions
│   │   │   │   └── route.ts
│   │   │   └── vote
│   │   │   └── route.ts
│   │   ├── chat
│   │   │   └── [id]
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── opengraph-image.png
│   │   ├── page.tsx
│   │   └── twitter-image.png
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── artifacts
│   ├── actions.ts
│   ├── code
│   │   ├── client.tsx
│   │   └── server.ts
│   ├── image
│   │   ├── client.tsx
│   │   └── server.ts
│   ├── sheet
│   │   ├── client.tsx
│   │   └── server.ts
│   └── text
│   ├── client.tsx
│   └── server.ts
├── biome.jsonc
├── bun.lock
├── components
│   ├── app-sidebar.tsx
│   ├── artifact-actions.tsx
│   ├── artifact-close-button.tsx
│   ├── artifact-messages.tsx
│   ├── artifact.tsx
│   ├── auth-form.tsx
│   ├── chat-header.tsx
│   ├── chat.tsx
│   ├── code-block.tsx
│   ├── code-editor.tsx
│   ├── console.tsx
│   ├── create-artifact.tsx
│   ├── data-stream-handler.tsx
│   ├── diffview.tsx
│   ├── document-preview.tsx
│   ├── document-skeleton.tsx
│   ├── document.tsx
│   ├── icons.tsx
│   ├── image-editor.tsx
│   ├── markdown.tsx
│   ├── message-actions.tsx
│   ├── message-editor.tsx
│   ├── message-reasoning.tsx
│   ├── message.tsx
│   ├── messages.tsx
│   ├── model-selector.tsx
│   ├── multimodal-input.tsx
│   ├── overview.tsx
│   ├── preview-attachment.tsx
│   ├── sheet-editor.tsx
│   ├── sidebar-history.tsx
│   ├── sidebar-toggle.tsx
│   ├── sidebar-user-nav.tsx
│   ├── sign-out-form.tsx
│   ├── submit-button.tsx
│   ├── suggested-actions.tsx
│   ├── suggestion.tsx
│   ├── text-editor.tsx
│   ├── theme-provider.tsx
│   ├── toolbar.tsx
│   ├── ui
│   │   ├── alert-dialog.tsx
│   │   ├── autosize-textarea.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   ├── use-scroll-to-bottom.ts
│   ├── version-footer.tsx
│   ├── visibility-selector.tsx
│   └── weather.tsx
├── components.json
├── docs
│   ├── 01-quick-start.md
│   ├── 02-update-models.md
│   └── 03-artifacts.md
├── drizzle.config.ts
├── hooks
│   ├── use-artifact.ts
│   ├── use-chat-visibility.ts
│   └── use-mobile.tsx
├── instructions.md
├── lib
│   ├── ai
│   │   ├── models.ts
│   │   ├── prompts.ts
│   │   └── tools
│   │   ├── create-document.ts
│   │   ├── get-weather.ts
│   │   ├── request-suggestions.ts
│   │   └── update-document.ts
│   ├── artifacts
│   │   └── server.ts
│   ├── db
│   │   ├── migrate.ts
│   │   ├── migrations
│   │   │   ├── 0000_keen_devos.sql
│   │   │   ├── 0001_sparkling_blue_marvel.sql
│   │   │   ├── 0002_wandering_riptide.sql
│   │   │   ├── 0003_cloudy_glorian.sql
│   │   │   ├── 0004_odd_slayback.sql
│   │   │   └── meta
│   │   │   ├── 0000_snapshot.json
│   │   │   ├── 0001_snapshot.json
│   │   │   ├── 0002_snapshot.json
│   │   │   ├── 0003_snapshot.json
│   │   │   ├── 0004_snapshot.json
│   │   │   └── \_journal.json
│   │   ├── queries.ts
│   │   └── schema.ts
│   ├── editor
│   │   ├── config.ts
│   │   ├── diff.js
│   │   ├── functions.tsx
│   │   ├── react-renderer.tsx
│   │   └── suggestions.tsx
│   └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json

36 directories, 136 files

</File_structure>
