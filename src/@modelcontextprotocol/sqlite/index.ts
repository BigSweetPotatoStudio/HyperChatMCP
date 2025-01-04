import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../../mcp";

const config = z.object({
  dbPath: z.string({
    required_error: "Path is required",
    description: "sqlite db path",
  }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "uvx",
  name: "mcp-server-sqlite",
  github: "https://github.com/modelcontextprotocol/servers.git",
  description: "sqlite",
  keywords: ["sqlite"],
  resolve: (config: Config) => {
    return {
      command: "uvx",
      args: ["mcp-server-sqlite", "--db-path", config.dbPath],
      env: {},
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
