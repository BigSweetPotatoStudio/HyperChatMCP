import { MCP } from "./mcp";
import "./@modelcontextprotocol/server-filesystem";
import "./mcp-obsidian/index";

window["jsonp"] && window["jsonp"](MCP);
export { MCP };
