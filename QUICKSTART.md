# Quick Start Guide

## Installation

```bash
# Clone the repository
git clone https://github.com/ShamenMudalige/Sample-MCP-Server.git
cd Sample-MCP-Server

# Install dependencies
npm install

# Build the project
npm run build
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Watch Mode (auto-rebuild on changes)
```bash
npm run watch
```

## VS Code Configuration

### Option 1: Direct Path Configuration

Edit your MCP settings file:
- **Linux/Mac**: `~/.config/Code/User/globalStorage/mcp.json`
- **Windows**: `%APPDATA%\Code\User\globalStorage\mcp.json`

Add:
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

### Option 2: Global Installation

```bash
npm run build
npm link
```

Then in your MCP settings:
```json
{
  "mcpServers": {
    "sample-mcp-server": {
      "command": "sample-mcp-server"
    }
  }
}
```

## Available Tools

### Calculator
Perform basic math operations:
- `add`: Addition
- `subtract`: Subtraction
- `multiply`: Multiplication
- `divide`: Division

**Parameters:**
- `operation`: string (required) - The operation to perform
- `a`: number (required) - First number
- `b`: number (required) - Second number

### Echo
Echo back a message with optional prefix:

**Parameters:**
- `message`: string (required) - The message to echo
- `prefix`: string (optional) - Prefix to add before the message

## Available Resources

### Server Info
- **URI**: `sample://info`
- **Description**: Get information about the MCP server

### Current Time
- **URI**: `sample://time`
- **Description**: Get the current server time in ISO format

## Testing the Server

The server communicates via stdio protocol, so you'll need an MCP client to test it properly. The easiest way is to configure it in VS Code with MCP support.

## Common Issues

### Server not starting
- Make sure you've run `npm install` and `npm run build`
- Check that Node.js v18+ is installed: `node --version`

### Changes not reflected
- Rebuild the project: `npm run build`
- Restart your MCP client (VS Code)

### Permission denied
- Make sure the dist/index.js file is executable: `chmod +x dist/index.js`

## Next Steps

- Read [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to add your own tools
- Check [README.md](README.md) for more detailed documentation
