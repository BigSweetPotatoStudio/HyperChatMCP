import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../../mcp";

const config = z.object({
  path: z.string({
    required_error: "Path is required",
    description: "allow path",
  }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "@modelcontextprotocol/server-filesystem",
  github: "https://github.com/modelcontextprotocol/servers.git",
  description: "Server filesystem",
  keywords: ["server", "filesystem"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-filesystem", config.path],
      env: {},
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
