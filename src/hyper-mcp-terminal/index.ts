import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { Package, MCP } from "../mcp";

const config = z.object({
  End_CheckCount: z
    .number({
      description:
        "The default is 15 times, and the detection interval is 100ms, which means that if the output remains unchanged for 1.5s, it means the command has ended.",
    })
    .default(15),
  Output_MaxToken: z
    .number({
      description: "The maximum output length for the large model",
    })
    .default(10000),
  Timeout: z
    .number({
      description: "(s), Terminal timed out after 5 minutes without input",
    })
    .default(5 * 60 * 1000),
});

type Config = z.infer<typeof config>;

const p: Package = {
  type: "npx",
  name: "hyper-mcp-terminal",
  github: "https://github.com/BigSweetPotatoStudio/hyper-mcp-terminal",
  description: "terminal is hyper-mcp-shell(advanced)，ssh execute-command",
  keywords: ["terminal", "linux", "execute-command", "ssh"],
  resolve: (config: Config) => {
    return {
      command: "npx",
      args: ["-y", "hyper-mcp-terminal"],
      env: {
        Terminal_End_CheckCount: config.End_CheckCount,
        Terminal_Output_MaxToken: config.Output_MaxToken,
        Terminal_Timeout: config.Timeout,
      } as any,
    };
  },
  configSchema: zodToJsonSchema(config),
};

MCP.register(p);
