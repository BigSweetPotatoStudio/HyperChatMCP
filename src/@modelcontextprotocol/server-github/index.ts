import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../../mcp";

const config = z.object({
  GITHUB_PERSONAL_ACCESS_TOKEN: z.string({
    required_error: "GITHUB_TOKEN is required",
    description: "GITHUB_TOKEN",
  }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "@modelcontextprotocol/server-github",
  github:
    "https://github.com/modelcontextprotocol/servers/blob/main/src/github/README.md",
  description: "github",
  keywords: ["github"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "@modelcontextprotocol/server-github"],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: config.GITHUB_PERSONAL_ACCESS_TOKEN,
      },
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
