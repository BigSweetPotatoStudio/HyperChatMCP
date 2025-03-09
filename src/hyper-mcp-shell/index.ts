import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../mcp";

const config = z.object({});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "hyper-mcp-shell",
  github: "https://github.com/BigSweetPotatoStudio/hyper-mcp-shell",
  description: "shell execute-command",
  keywords: ["shell", "execute-command"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "hyper-mcp-shell"],
      env: {},
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
