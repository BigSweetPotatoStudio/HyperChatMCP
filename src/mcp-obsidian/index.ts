import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../mcp";

const config = z.object({
  path: z.string({
    required_error: "Path is required",
    description: "obsidian note path",
  }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "mcp-obsidian",
  github: "https://github.com/MarkusPfundstein/mcp-obsidian",
  description: "obsidian",
  keywords: ["obsidian"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "mcp-obsidian", config.path],
      env: {},
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
