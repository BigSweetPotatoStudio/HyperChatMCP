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
  browserURL: z
    .string({
      description: "The host of the browser",
    })
    .default("http://localhost:9222"),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "hyper-mcp-browser",
  github: "https://github.com/BigSweetPotatoStudio/hyper-mcp-browser",
  description: "use chrome browser, summarize-page and use search engine",
  keywords: ["browser","open-url"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "hyper-mcp-browser"],
      env: {
        Hyper_SEARCH_ENGINE: config.SEARCH_ENGINE,
        Hyper_isUseLoacl: config.isUseLoacl,
        Hyper_browserURL: config.browserURL,
      } as any,
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
