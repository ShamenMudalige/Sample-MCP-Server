# Sample MCP Server

A sample Model Context Protocol (MCP) server implementation that can be used with VS Code and other MCP clients. This server provides basic tools and resources to demonstrate MCP capabilities.

## Features

### Tools
- **calculate**: Perform basic mathematical operations (add, subtract, multiply, divide)
- **echo**: Echo back a message with an optional prefix

### Resources
- **sample://info**: Get information about this MCP server
- **sample://time**: Get the current server time

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- VS Code with MCP support (or another MCP client)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/ShamenMudalige/Sample-MCP-Server.git
cd Sample-MCP-Server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Running the Server Directly

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

### Using with VS Code

To use this MCP server with VS Code, you need to configure it in your MCP settings:

1. Locate your MCP configuration file (usually `~/.config/Code/User/globalStorage/mcp.json` on Linux/Mac or `%APPDATA%\Code\User\globalStorage\mcp.json` on Windows)

2. Add this server to your configuration:

```json
{
  "mcpServers": {
    "sample-mcp-server": {
      "command": "node",
      "args": ["/absolute/path/to/Sample-MCP-Server/dist/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/Sample-MCP-Server` with the actual path to where you cloned this repository.

3. Restart VS Code

4. The tools and resources provided by this server should now be available in your MCP-enabled VS Code features.

### Alternative: Using npm link

You can also install the server globally:

```bash
npm run build
npm link
```

Then in your MCP configuration:

```json
{
  "mcpServers": {
    "sample-mcp-server": {
      "command": "sample-mcp-server"
    }
  }
}
```

## Development

### Building

```bash
npm run build
```

### Watch Mode

For development with auto-rebuild:
```bash
npm run watch
```

### Project Structure

```
Sample-MCP-Server/
├── src/
│   └── index.ts          # Main server implementation
├── dist/                 # Compiled JavaScript output
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Example Tool Usage

Once configured in VS Code, you can use the tools through your MCP client:

### Calculator Tool
```typescript
// Add two numbers
calculate({ operation: "add", a: 5, b: 3 })
// Result: 5 add 3 = 8

// Divide numbers
calculate({ operation: "divide", a: 10, b: 2 })
// Result: 10 divide 2 = 5
```

### Echo Tool
```typescript
// Simple echo
echo({ message: "Hello, World!" })
// Result: Hello, World!

// Echo with prefix
echo({ message: "This is a test", prefix: "INFO" })
// Result: INFO: This is a test
```

## Extending the Server

To add your own tools or resources:

1. Add new tool definitions in the `ListToolsRequestSchema` handler
2. Implement the tool logic in the `CallToolRequestSchema` handler
3. Add new resources in the `ListResourcesRequestSchema` handler
4. Implement resource reading in the `ReadResourceRequestSchema` handler
5. Rebuild the project with `npm run build`

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!