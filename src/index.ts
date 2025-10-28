#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create server instance
const server = new Server(
  {
    name: "sample-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "calculate",
        description: "Perform basic mathematical calculations (add, subtract, multiply, divide)",
        inputSchema: {
          type: "object",
          properties: {
            operation: {
              type: "string",
              enum: ["add", "subtract", "multiply", "divide"],
              description: "The mathematical operation to perform",
            },
            a: {
              type: "number",
              description: "The first number",
            },
            b: {
              type: "number",
              description: "The second number",
            },
          },
          required: ["operation", "a", "b"],
        },
      },
      {
        name: "echo",
        description: "Echo back a message with optional prefix",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "The message to echo back",
            },
            prefix: {
              type: "string",
              description: "Optional prefix to add before the message",
            },
          },
          required: ["message"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "calculate") {
    const { operation, a, b } = args as { operation: string; a: number; b: number };
    let result: number;

    switch (operation) {
      case "add":
        result = a + b;
        break;
      case "subtract":
        result = a - b;
        break;
      case "multiply":
        result = a * b;
        break;
      case "divide":
        if (b === 0) {
          throw new Error("Cannot divide by zero");
        }
        result = a / b;
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    return {
      content: [
        {
          type: "text",
          text: `Result: ${a} ${operation} ${b} = ${result}`,
        },
      ],
    };
  }

  if (name === "echo") {
    const { message, prefix } = args as { message: string; prefix?: string };
    const response = prefix ? `${prefix}: ${message}` : message;

    return {
      content: [
        {
          type: "text",
          text: response,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Define available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "sample://info",
        name: "Server Information",
        description: "Information about this MCP server",
        mimeType: "text/plain",
      },
      {
        uri: "sample://time",
        name: "Current Time",
        description: "Get the current server time",
        mimeType: "text/plain",
      },
    ],
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "sample://info") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: "Sample MCP Server v1.0.0\n\nThis is a sample Model Context Protocol server that provides:\n- Calculator tool for basic math operations\n- Echo tool for message repetition\n- Server information and time resources",
        },
      ],
    };
  }

  if (uri === "sample://time") {
    const currentTime = new Date().toISOString();
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: `Current server time: ${currentTime}`,
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sample MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
