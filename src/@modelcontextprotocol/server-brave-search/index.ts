import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../../mcp";

const config = z.object({
  BRAVE_API_KEY: z.string({
    required_error: "BRAVE_API_KEY is required",
    description: "BRAVE_API_KEY",
  }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "@modelcontextprotocol/server-brave-search",
  github:
    "https://github.com/modelcontextprotocol/servers/blob/main/src/brave-search/README.md",
  description: "enter apikey brave-search",
  keywords: ["search"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-brave-search"],
      env: {
        BRAVE_API_KEY: config.BRAVE_API_KEY,
      },
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
