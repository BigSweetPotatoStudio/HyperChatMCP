import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../mcp";

const config = z.object({
  End_CheckCount: z.number({ description: "The default is 15 times, and the detection interval is 100ms, which means that if the output remains unchanged for 1.5s, it means the command has ended." }),
  Output_MaxToken: z.number({ description: "The maximum output length for the large model" }),
  Timeout: z.number({ description: "(s), Terminal timed out after 5 minutes without input" }),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "hyper-mcp-terminal",
  github: "https://github.com/BigSweetPotatoStudio/hyper-mcp-terminal",
  description: "terminal execute-command",
  keywords: ["terminal", "shell", "execute-command"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "hyper-mcp-terminal"],
      env: {
        Terminal_End_CheckCount: config.Timeout,
        Terminal_Output_MaxToken: config.Timeout,
        Terminal_Timeout: config.Timeout,
      } as any,
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
