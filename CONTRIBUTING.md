# Contributing to Sample MCP Server

Thank you for your interest in contributing! This guide will help you add new tools and resources to the server.

## Adding a New Tool

1. **Define the tool** in the `ListToolsRequestSchema` handler in `src/index.ts`:

```typescript
{
  name: "your_tool_name",
  description: "What your tool does",
  inputSchema: {
    type: "object",
    properties: {
      param1: {
        type: "string",
        description: "First parameter description",
      },
      // Add more parameters as needed
    },
    required: ["param1"],
  },
}
```

2. **Implement the tool** in the `CallToolRequestSchema` handler:

```typescript
if (name === "your_tool_name") {
  const { param1 } = args as { param1: string };
  
  // Your tool logic here
  const result = doSomething(param1);
  
  return {
    content: [
      {
        type: "text",
        text: `Result: ${result}`,
      },
    ],
  };
}
```

3. **Rebuild** the project:
```bash
npm run build
```

## Adding a New Resource

1. **Define the resource** in the `ListResourcesRequestSchema` handler:

```typescript
{
  uri: "sample://your-resource",
  name: "Your Resource Name",
  description: "What your resource provides",
  mimeType: "text/plain",
}
```

2. **Implement resource reading** in the `ReadResourceRequestSchema` handler:

```typescript
if (uri === "sample://your-resource") {
  return {
    contents: [
      {
        uri,
        mimeType: "text/plain",
        text: "Your resource content here",
      },
    ],
  };
}
```

3. **Rebuild** the project:
```bash
npm run build
```

## Testing Your Changes

1. Build the project:
```bash
npm run build
```

2. Test in development mode:
```bash
npm run dev
```

3. The server communicates via stdio, so you'll need an MCP client (like VS Code with MCP support) to test the tools and resources.

## Code Style

- Use TypeScript with strict mode enabled
- Follow the existing code structure
- Add descriptive comments for complex logic
- Keep error messages clear and helpful

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Make your changes
4. Build and test locally
5. Commit your changes (`git commit -m 'Add amazing tool'`)
6. Push to your fork (`git push origin feature/amazing-tool`)
7. Open a Pull Request

## Questions?

Feel free to open an issue for any questions or suggestions!
