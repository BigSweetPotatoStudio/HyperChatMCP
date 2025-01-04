import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
export type Package = {
  type: "npx" | "uvx" | "other";
  name: string;
  github?: string;
  description: string;
  keywords: string[];
  resolve: (config: any) => {
    command: string;
    args: string[];
    env: Record<string, string>;
  };
  configSchema: any;
};

class MCPServers {
  data: Package[] = [];
  register(p: Package) {
    this.data.push(p);
  }
}

export const MCP = new MCPServers();
