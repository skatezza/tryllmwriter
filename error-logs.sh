✅ API key validated: { keyLength: 164, startsWithSk: true, firstFiveChars: 'sk-pr...' }
 GET /api/vote?chatId=1ae43263-daf2-4473-82f8-138df4d3e427 200 in 1503ms
 GET /api/history 200 in 1511ms
🚀 Starting stream response...
📡 Executing stream with model: chat-model-large
 GET /api/keys/get 200 in 2141ms
Error in chat: Error [AI_ToolExecutionError]: Error executing tool createDocument: You didn't provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you're accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://platform.openai.com/account/api-keys.
    at <unknown> (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/generate-text/run-tools-transformation.ts:249:31)
    at async (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/telemetry/record-span.ts:18:21)
  247 |                       toolResultsStreamController!.enqueue({
  248 |                         type: 'error',
> 249 |                         error: new ToolExecutionError({
      |                               ^
  250 |                           toolCallId: toolCall.toolCallId,
  251 |                           toolName: toolCall.toolName,
  252 |                           toolArgs: toolCall.args, {
  toolArgs: [Object],
  toolName: 'createDocument',
  toolCallId: 'call_WrFUJn33cueIGOwkTBLSYfIT',
  [cause]: Error [AI_APICallError]: You didn't provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you're accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://platform.openai.com/account/api-keys.
      at <unknown> (turbopack://[project]/node_modules/.pnpm/@ai-sdk+openai@1.1.9_zod@3.23.8/node_modules/@ai-sdk/openai/node_modules/@ai-sdk/provider-utils/src/response-handler.ts:59:15)
      at async postToApi (turbopack://[project]/node_modules/.pnpm/@ai-sdk+openai@1.1.9_zod@3.23.8/node_modules/@ai-sdk/openai/node_modules/@ai-sdk/provider-utils/src/post-to-api.ts:81:27)
      at async OpenAIChatLanguageModel.doStream (turbopack://[project]/node_modules/.pnpm/@ai-sdk+openai@1.1.9_zod@3.23.8/node_modules/@ai-sdk/openai/src/openai-chat-language-model.ts:504:49)
      at async fn (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/generate-object/stream-object.ts:683:22)
      at async (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/telemetry/record-span.ts:18:21)
      at async _retryWithExponentialBackoff (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/util/retry-with-exponential-backoff.ts:36:11)
      at async fn (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/generate-object/stream-object.ts:648:12)
      at async (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/telemetry/record-span.ts:18:21)
    57 |       return {
    58 |         responseHeaders,
  > 59 |         value: new APICallError({
       |               ^
    60 |           message: errorToMessage(parsedError),
    61 |           url,
    62 |           requestBodyValues, {
    cause: undefined,
    url: 'https://api.openai.com/v1/chat/completions',
    requestBodyValues: {
      model: 'gpt-4o-mini',
      logit_bias: undefined,
      logprobs: undefined,
      top_logprobs: undefined,
      user: undefined,
      parallel_tool_calls: undefined,
      max_tokens: undefined,
      temperature: 0,
      top_p: undefined,
      frequency_penalty: undefined,
      presence_penalty: undefined,
      response_format: undefined,
      stop: undefined,
      seed: undefined,
      max_completion_tokens: undefined,
      store: undefined,
      metadata: undefined,
      prediction: undefined,
      reasoning_effort: undefined,
      messages: [Array],
      tool_choice: [Object],
      tools: [Array],
      stream: true,
      stream_options: undefined
    },
    statusCode: 401,
    responseHeaders: {
      'alt-svc': 'h3=":443"; ma=86400',
      'cf-cache-status': 'DYNAMIC',
      'cf-ray': '9126aed27b04fe8b-SIN',
      connection: 'keep-alive',
      'content-length': '496',
      'content-type': 'application/json; charset=utf-8',
      date: 'Sat, 15 Feb 2025 16:30:31 GMT',
      server: 'cloudflare',
      'set-cookie': '_cfuvid=VWEr2nIt0aFTupGZ0S4NUV6cG3acxwa037Gd0MzAapo-1739637031017-0.0.1.1-604800000; path=/; domain=.api.openai.com; HttpOnly; Secure; SameSite=None',
      'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
      vary: 'Origin',
      'x-content-type-options': 'nosniff',
      'x-request-id': 'req_61bf66536a78913d1cc80ee2cac0fc6f'
    },
    responseBody: '{\n' +
      '    "error": {\n' +
      `        "message": "You didn't provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you're accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://platform.openai.com/account/api-keys.",\n` +
      '        "type": "invalid_request_error",\n' +
      '        "param": null,\n' +
      '        "code": null\n' +
      '    }\n' +
      '}\n',
    isRetryable: false,
    data: { error: [Object] }
  }
}
Failed to save messages in database Error: values() must be called with at least one value
    at PgInsertBuilder.values (turbopack://[project]/node_modules/.pnpm/drizzle-orm@0.34.1_@neondatabase+serverless@0.9.5_@opentelemetry+api@1.9.0_@types+pg@8.11.6_@_bxbm5u47tukj6nmhfvnnj7uaym/node_modules/src/pg-core/query-builders/insert.ts:54:9)
    at saveMessages (turbopack://[project]/lib/db/queries.ts:109:36)
    at onFinish (turbopack://[project]/app/(chat)/api/chat/route.ts:157:33)
    at Object.flush (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/generate-text/stream-text.ts:725:16)
  52 | 		values = Array.isArray(values) ? values : [values];
  53 | 		if (values.length === 0) {
> 54 | 			throw new Error('values() must be called with at least one value');
     | 			     ^
  55 | 		}
  56 | 		const mappedValues = values.map((entry) => {
  57 | 			const result: Record<string, Param | SQL> = {};
Failed to save chat
 POST /api/chat 200 in 3763ms
 GET /api/history 200 in 610ms
 GET /api/vote?chatId=1ae43263-daf2-4473-82f8-138df4d3e427 200 in 625ms
 GET /api/keys/get 200 in 2169ms
🚀 Starting chat POST request...
📝 Selected chat model: chat-model-large
✅ User authenticated: 8ede7799-2abc-4c2b-a27d-10299c9306d4
🔓 Decrypting API key...
✅ Decryption successful
✅ API key validated: { keyLength: 164, startsWithSk: true, firstFiveChars: 'sk-pr...' }
🚀 Starting stream response...
📡 Executing stream with model: chat-model-large
Error in chat: Error [AI_MessageConversionError]: ToolInvocation must have a result: {"state":"call","step":0,"toolCallId":"call_WrFUJn33cueIGOwkTBLSYfIT","toolName":"createDocument","args":{"title":"PureMessages Function","kind":"code"}}
    at <unknown> (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/prompt/convert-to-core-messages.ts:88:22)
    at Array.map (<anonymous>)
    at convertToCoreMessages (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/prompt/convert-to-core-messages.ts:86:37)
    at standardizePrompt (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/prompt/standardize-prompt.ts:93:10)
    at new DefaultStreamTextResult (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/generate-text/stream-text.ts:805:26)
    at streamText (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/generate-text/stream-text.ts:299:9)
    at execute (turbopack://[project]/app/(chat)/api/chat/route.ts:122:32)
    at createDataStream (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/data-stream/create-data-stream.ts:30:19)
    at createDataStreamResponse (turbopack://[project]/node_modules/.pnpm/ai@4.1.17_react@19.0.0-rc-45804af1-20241021_zod@3.23.8/node_modules/ai/core/data-stream/create-data-stream-response.ts:16:4)
    at POST (turbopack://[project]/app/(chat)/api/chat/route.ts:119:34)
    at async AppRouteRouteModule.do (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/dist/compiled/next-server/dist/src/server/route-modules/app-route/module.ts:527:14)
    at async AppRouteRouteModule.handle (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/dist/compiled/next-server/dist/src/server/route-modules/app-route/module.ts:654:30)
    at async doRender (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:2553:29)
    at async responseGenerator (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:3054:21)
    at async DevServer.renderToResponseWithComponentsImpl (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:3109:23)
    at async DevServer.renderPageComponent (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:3666:15)
    at async DevServer.renderToResponseImpl (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:3728:23)
    at async DevServer.pipeImpl (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:1739:20)
    at async NextNodeServer.handleCatchallRenderRequest (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/next-server.ts:1032:6)
    at async DevServer.handleRequestImpl (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/base-server.ts:1499:8)
    at async (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/dev/next-dev-server.ts:514:13)
    at async Span.traceAsyncFn (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/trace/trace.ts:143:13)
    at async DevServer.handleRequest (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/dev/next-dev-server.ts:512:19)
    at async invokeRender (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/lib/router-server.ts:284:10)
    at async handleRequest (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/lib/router-server.ts:530:15)
    at async requestHandlerImpl (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/lib/router-server.ts:576:6)
    at async Server.requestListener (file:///Users/julienjung/Developments/prototypes/minimal-chat/node_modules/.pnpm/next@15.0.3-canary.2_@opentelemetry+api@1.9.0_react-dom@19.0.0-rc-45804af1-20241021_react@19._u2czya7jp5qh6owzzbmnspihnq/node_modules/next/src/server/lib/start-server.ts:146:6)
  86 |             content: stepInvocations.map((toolInvocation): ToolResultPart => {
  87 |               if (!('result' in toolInvocation)) {
> 88 |                 throw new MessageConversionError({
     |                      ^
  89 |                   originalMessage: message,
  90 |                   message:
  91 |                     'ToolInvocation must have a result: ' + {
  cause: undefined,
  originalMessage: [Object]
}
 POST /api/chat 200 in 1317ms
 GET /api/vote?chatId=1ae43263-daf2-4473-82f8-138df4d3e427 200 in 671ms
 GET /api/history 200 in 713ms
 GET /api/keys/get 200 in 2930ms
 GET /api/vote?chatId=1ae43263-daf2-4473-82f8-138df4d3e427 200 in 944ms
 GET /api/history 200 in 955ms
 GET /api/keys/get 200 in 1968ms
