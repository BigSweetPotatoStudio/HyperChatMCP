import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../mcp";

const config = z.object({
  SEARCH_ENGINE: z
    .enum(["google", "bing"], {
      description: "use search engine",
    })
    .default("google"),
  isUseLoacl: z
    .enum(["true", "false"], {
      description: "use search engine",
    })
    .default("true"),
  Browser_HOST: z
    .string({
      description: "The host of the browser",
    })
    .default("127.0.0.1"),
  Browser_PORT: z
    .number({
      description: "The debuuger port of the browser",
    })
    .default(9222),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "hyper-mcp-browser",
  github: "https://github.com/BigSweetPotatoStudio/hyper-mcp-browser",
  description: "terminal execute-command",
  keywords: ["terminal", "shell", "execute-command"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "hyper-mcp-browser"],
      env: {
        Hyper_SEARCH_ENGINE: config.SEARCH_ENGINE,
        Hyper_isUseLoacl: config.isUseLoacl,
        Hyper_Browser_HOST: config.Browser_HOST,
        Hyper_Browser_PORT: config.Browser_PORT,
      } as any,
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
