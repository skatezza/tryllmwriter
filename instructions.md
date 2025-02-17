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

### Sidebar

- [x] The sidebar appears when we click on the sidebar icon
- [x] The sidebar contains the chat history from latest to oldest interactions
- [x] The sidebar contains a + button to create a new chat (top right)
- [x] Each chat has a "More" dropdown menu with the following options:
  - [x] Export chat
    - [x] Export as TXT
    - [x] Export as Markdown
    - [x] Export as JSON
    - [x] Export as PDF
  - [x] Share
  - [x] Delete

<Chat_interface>

- [x] There's a fade gradient effect on the top and bottom of the chat
- [ ] The chat's text area is displayed with mb-[20vh] margin bottom
- [x] The chat header contains:
  - [x] Sidebar toggle button
  - [x] New chat button (when sidebar is closed)
  - [x] Model selector
  - [x] Visibility selector
  - [x] Export button with dropdown menu (TXT, Markdown, JSON, PDF)

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

1. Chat Interface ✅

   - ✅ Added top and bottom gradient effects
   - ✅ Implemented 20vh bottom margin
   - ✅ Added proper spacing and padding
   - ✅ Centered content with responsive max-width

2. Messages Area ✅

   - ✅ Implemented message stacking with consistent gaps
   - ✅ Added responsive padding
   - ✅ Centered content with max-width constraints
   - ✅ Added proper overflow handling

3. Text Area ✅
   - ✅ Added sky-500 caret color
   - ✅ Set transparent background
   - ✅ Removed borders
   - ✅ Added monospace font
   - ✅ Implemented proper padding and spacing

</Implementation_details>

<Required_Next_Steps>

## Required Next Steps

1. Export Functionality:

   - [x] Implement TXT export with proper message formatting
   - [x] Implement Markdown export with proper message formatting
   - [x] Implement JSON export with complete chat data
   - [x] Implement PDF export with proper formatting

2. Required Components:
   - [x] Add export functionality to chat dropdown menu
   - [x] Create error handling with toast notifications

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
